import { app, BrowserWindow } from 'electron';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

const isDev = process.env.NODE_ENV === 'development';

// TODO: path resolver for dev / prod mode
const getUIPath = () => path.join(__dirname, '../../frontend/build/index.html');

let mainWindow: BrowserWindow | null = null;
let backendProcess: ChildProcess | null = null;

app.on('ready', () => {
    // Create the main window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // Load the frontend
    if (isDev) {
        console.log("dev mode")
        mainWindow.loadURL('http://localhost:3000'); // React dev server
    } else {
        console.log('Loading prod file:', getUIPath());
        mainWindow.loadFile(getUIPath()); // Built React app

        // TODO: remove this for production
        mainWindow.webContents.openDevTools();
    }

    // Spawn Python backend
    // TODO: python3 works only for Ubuntu, NOT Win or Mac
    // TODO: will the path work for packaging - resolve paths problem
    backendProcess = spawn('python3', [path.join(__dirname, '../../backend/main.py')], {
        stdio: 'inherit', // Forward Python logs to Electron console
    });

    backendProcess.on('error', (err) => {
        console.error('Failed to start Python backend:', err);
    });

    // Cleanup when window closes
    mainWindow.on('closed', () => {
        if (backendProcess) {
            backendProcess.kill();
        }
        mainWindow = null;
        app.quit();
    });
});
