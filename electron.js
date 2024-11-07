// main.js (Electron main process)

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Specify the preload script
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000');  // Assuming your Next.js app runs on localhost:3000

  // Listen for the print command from renderer process
  ipcMain.on('print-content', () => {
    const webContents = mainWindow.webContents;
    webContents.print({}, (success, failureReason) => {
      if (success) {
        console.log('Printed successfully');
      } else {
        console.error('Failed to print:', failureReason);
      }
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
