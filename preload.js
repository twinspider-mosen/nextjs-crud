// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer via contextBridge to safely access in renderer process
contextBridge.exposeInMainWorld('electron', {
  sendPrintCommand: () => ipcRenderer.send('print-content'),
});
