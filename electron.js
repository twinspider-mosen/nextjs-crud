
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false, 
      contextIsolation: true, 
    }
  });

  mainWindow.loadURL('http://localhost:3000'); 
  
  
//   mainWindow.webContents.openDevTools();

  // Handle window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Electron will initialize when it's ready
app.whenReady().then(() => {
  createWindow();

  // Quit when all windows are closed (macOS compatibility)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // Handle macOS behavior (app stays open even after all windows are closed)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

