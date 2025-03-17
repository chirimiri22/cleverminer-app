import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import * as fs from 'fs';

// Use import.meta.url to resolve __dirname in ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Replace the electron-is-dev dependency with a simple check
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow: BrowserWindow | null = null;
let pythonProcess: ChildProcess | null = null;

function createWindow(): void {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Load the app
    const startUrl: string = isDev
        ? 'http://localhost:3000' // React dev server in development
        : `file://${path.join(__dirname, '../build/index.html')}`; // Production build

    console.log(`Loading URL: ${startUrl}`);
    mainWindow.loadURL(startUrl);

    // Open DevTools in development
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function startPythonBackend(): void {
    try {
        // Determine Python executable path
        const pythonExecutables = ['python3', 'python'];
        let pythonPath: string | null = null;

        if (isDev) {
            // Find an available Python executable on the system
            for (const executable of pythonExecutables) {
                try {
                    // Check if the executable exists in PATH
                    require('child_process').execSync(`${executable} --version`, {stdio: 'ignore'});
                    pythonPath = executable;
                    console.log(`Found Python executable: ${pythonPath}`);
                    break;
                } catch (e) {
                    console.log(`Executable ${executable} not found in PATH`);
                }
            }

            if (!pythonPath) {
                console.error('No Python executable found in PATH. Please install Python.');
                return;
            }
        } else {
            // Production path
            pythonPath = path.join(process.resourcesPath, 'python');
            console.log(`Using packaged Python executable: ${pythonPath}`);

            // Check if the packaged Python exists
            if (!fs.existsSync(pythonPath)) {
                console.error(`Packaged Python executable not found at: ${pythonPath}`);
                return;
            }
        }

        // Determine script path
        const scriptPath: string = isDev
            ? path.join(__dirname, '../../backend/main.py')
            : path.join(process.resourcesPath, 'api', 'main.py');

        console.log(`Using Python script path: ${scriptPath}`);

        // Check if script exists
        if (!fs.existsSync(scriptPath)) {
            console.error(`Python script not found at: ${scriptPath}`);
            return;
        }

        // Log full command for debugging
        console.log(`Executing: ${pythonPath} ${scriptPath}`);

        // Spawn with explicit error handling
        pythonProcess = spawn(pythonPath, [scriptPath], {
            stdio: 'pipe',
            env: process.env,
        });

        pythonProcess.stdout?.on('data', (data: Buffer) => {
            console.log(`Python stdout: ${data.toString()}`);
        });

        pythonProcess.stderr?.on('data', (data: Buffer) => {
            console.error(`Python stderr: ${data.toString()}`);
        });

        pythonProcess.on('error', (err) => {
            console.error(`Failed to start Python process: ${err.message}`);
            console.error(err.stack);
        });

        pythonProcess.on('close', (code: number) => {
            console.log(`Python process exited with code ${code}`);
        });

    } catch (error) {
        console.error('Error starting Python backend:', error);
    }
}

app.on('ready', () => {
    console.log('Electron app is ready');
    startPythonBackend();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }

    // Kill the Python backend process when app closes
    if (pythonProcess) {
        pythonProcess.kill();
        pythonProcess = null;
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('quit', () => {
    // Make sure Python process is killed when app quits
    if (pythonProcess) {
        pythonProcess.kill();
        pythonProcess = null;
    }
});
