import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import SinsFinder from './SinsFinder';
import {IPCHandler} from './IPCHandler';
import Store = require('electron-store');
import {DB} from '../shared/enums/DB';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;
// @ts-ignore
let ipc;
let store = new Store();

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

const createWindow = async () => {
  // If there isn't an entry for stardockLauncher OR the entry points to an invalid location,
  // find a valid location
  if (!store.has(DB.STARDOCK_LAUNCHER)
      || typeof store.get(DB.STARDOCK_LAUNCHER) !== 'string'
      || !( await SinsFinder.pathExists(store.get(DB.STARDOCK_LAUNCHER)) )) {
    store.set(DB.STARDOCK_LAUNCHER, await SinsFinder.findStardockLauncher());
  }

  if (!store.has(DB.MODS_DIR)
      || typeof store.get(DB.MODS_DIR) !== 'string'
      || !( await SinsFinder.pathExists(store.get(DB.MODS_DIR)) )) {
    store.set(DB.MODS_DIR, await SinsFinder.findModsDir());
  }

  // If the store doesn't have an installed list OR the value ISN'T an array, initialise an empty array
  if (!store.has(DB.INSTALLED) || Array.isArray(store.get(DB.INSTALLED))) {
    store.set(DB.INSTALLED, []);
  }

  // Register relevant sins locations
  global[DB.STARDOCK_LAUNCHER] = store.get(DB.STARDOCK_LAUNCHER);
  global[DB.MODS_DIR] = store.get(DB.MODS_DIR);

  // Register IPC handlers
  ipc = new IPCHandler();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../client/index.html`);

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
