const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 460,
    frame: false, // Remove a moldura padrão
    transparent: true, // Permite bordas arredondadas
    resizable: false, // Impede redimensionamento
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, './renderer/homepage.html'));
};

// Comunicação com o front-end
ipcMain.on('fechar-janela', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.on('minimizar-janela', () => {
  if (mainWindow) mainWindow.minimize();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
