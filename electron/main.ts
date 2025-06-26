import { app, BrowserWindow, ipcMain, dialog, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const isDev: boolean = !app.isPackaged;

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  // Поиск основного монитора и его размеры
  const primaryDisplay: Electron.Display = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Создание окна
  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  // Отключение меню в шапке окна
  mainWindow.setMenu(null);

  // Подключение интерфейса
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
});

app.commandLine.appendSwitch('--no-sandbox');

// api
ipcMain.handle('dialog:openFolder', async () => {
  const opening: Electron.OpenDialogReturnValue = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  console.log(111, opening);

  if (opening.canceled || opening.filePaths.length === 0) return [];

  return fs.readdirSync(opening.filePaths[0]);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
