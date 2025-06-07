import {app, BrowserWindow} from 'electron';
import path from 'path';
import {spawn} from 'child_process';

// MAKE SURE TO SET THE isDev VARIABLE ACCORDINGLY
const IS_DEV = true;

let pythonProcess: any = null;

const projectRoot = app.getAppPath();


function startPythonBackend() {
    console.log(`Starting Python backend in ${IS_DEV ? 'development' : 'production'} mode`);
    const isWindows = process.platform === 'win32';
    const executableName = isWindows ? 'main.exe' : 'main';

    const pythonCodePath = IS_DEV
        ? path.join(projectRoot, '..', 'backend', 'main.py')
        : path.join(process.resourcesPath, 'backend', 'dist', executableName);

    const executable = IS_DEV ? 'python3' : pythonCodePath;
    const args = IS_DEV ? [pythonCodePath] : [];

    try {
        console.log(`Attempting to spawn: ${executable} with args: ${args}`);
        pythonProcess = spawn(executable, args, {
            stdio: ['ignore', 'pipe', 'pipe'],
            windowsHide: true, // Hide console window on Windows
        });

        pythonProcess.stdout.on('data', (data: any) => {
            console.log(`Python stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data: any) => {
            console.error(`Python stderr: ${data}`);
        });

        pythonProcess.on('error', (err: { message: any; }) => {
            console.error(`Failed to start Python process: ${err.message}`);
        });

        pythonProcess.on('close', (code: any) => {
            console.log(`Python process exited with code ${code}`);
        });
    } catch (err) {
        console.error(`Error spawning Python process: ${err}`);
    }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });


    const url = IS_DEV
        ? 'http://localhost:3000'
        : `file://${path.join(process.resourcesPath, 'frontend', 'build', 'index.html')}`;

    win.loadURL(url).catch((err) => {
        console.error(`Failed to load URL: ${err}`);
    });

}

app.whenReady().then(() => {
    try {
        startPythonBackend();
        createWindow();
    } catch (err) {
        console.error(`Error in app.whenReady: ${err}`);
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (pythonProcess) {
        pythonProcess.kill();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('quit', () => {
    if (pythonProcess) {
        pythonProcess.kill();
    }
});
