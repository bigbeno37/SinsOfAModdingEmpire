import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import {DB} from './DB';
import {Utils} from './Utils';
import {setupIpcHandlers} from './IPCHandler';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

const createWindow = async () => {
  const db = new DB();

  // If the stardockLauncher path isn't found, prompt the user to find it
  if (!db.stardockLauncher) {
    Utils.showErrorDialog('Unable to find the stardock launcher executable! Please locate it.');
    db.stardockLauncher = Utils.showOpenFileDialog('exe').replace('\\', '/');
  }

  if (!db.modsDir) {
    Utils.showErrorDialog('Unable to find the mods directory! Please locate it.');
    db.modsDir = Utils.showOpenFolderDialog().replace('\\', '/');
  }

  setupIpcHandlers();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../react/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
