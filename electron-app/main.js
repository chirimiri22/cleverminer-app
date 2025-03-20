"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const child_process_1 = require("child_process");
const path = require("path");
const isDev = process.env.NODE_ENV === 'development';
const getUIPath = () => path.join(__dirname, '../frontend/dist/index.html');
let mainWindow = null;
let backendProcess = null;
electron_1.app.on('ready', () => {
    // Create the main window
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
    });
    // Load the frontend
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000'); // React dev server
    }
    else {
        mainWindow.loadFile(getUIPath()); // Built React app
    }
    // Spawn Python backend
    backendProcess = (0, child_process_1.spawn)('python', [path.join(__dirname, '../backend/main.py')], {
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
        electron_1.app.quit();
    });
});
