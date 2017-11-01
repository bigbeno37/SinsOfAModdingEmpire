import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import {Mod} from "./src/app/models/Mod";
import * as util from "util";
import {isNullOrUndefined} from "util";

let win, serve;
const args = process.argv.slice(1);
const Store = require('electron-store');
const store = new Store();
serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {

  const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // store.set('mods', [ new Mod('Star Trek: Armada III', 'Someone', 'A Star Trek mod!', '') ]);

  if (store.get('mods') === undefined) {

    let mods: Mod[] = [
      new Mod( 'Star Trek: Armada III', 'Someone', 'A Star Trek mod!', '' ),
      new Mod( 'Sins of a Solar Empire: Rebellion', 'Stardock', 'The vanilla game', '' )
    ];

    // TODO
    // Change to []
    store.set('mods', mods);
  }

  global['mods'] = store.get('mods');

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1280,
    height: 720
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

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
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
