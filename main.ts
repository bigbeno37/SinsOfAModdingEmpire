import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import {Mod} from "./src/models/Mod";
import STA3 from "./src/mods/STA3";


let win, serve;
const args = process.argv.slice(1);
const Store = require('electron-store');
const store = new Store();
const fs = require('fs');
const Finder = require('fs-finder');
serve = args.some(val => val === '--serve');


let sinsModDir = "";
let sinsDir = "";


if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function generateDummyCode() {
  store.delete('mods');

  if (!store.has('mods')) {

    let mods: Mod[] = [new Mod("Sins of a Solar Empire: Rebellion", "Stardock", "The vanilla experience", ["AdventExtermination.png"], [])];
    mods.push(STA3);

    // TODO
    // Change to []
    store.set('mods', mods);
  }

  store.delete('modDir');
  store.delete('sinsDir');
}

function findSinsModFolder(): string {
  let drives: string[] = ['C', 'D', 'E'];
  let modsLocation: string;

  for (let drive of drives) {
    try {
      let currentDir: string[] = Finder.in(drive + ':/Users/' + require("os").userInfo().username + '/Documents/').findDirectories('My Games');

      if (currentDir.length > 0) {
        modsLocation = currentDir[0] + '\\Ironclad Games\\Sins of a Solar Empire Rebellion\\Mods-Rebellion v1.85\\';
        break;
      }
    } catch {}
  }

  return modsLocation;
}

function findSinsProgramFolder(): string {
  let drives: string[] = ['C', 'D', 'E'];
  let sinsLocation: string;

  for (let drive of drives) {
    try {
      let currentDir: string[] = Finder.in(drive + ':/SteamLibrary/').findDirectories('steamapps');

      if (currentDir.length > 0) {
        sinsLocation = currentDir[0] + '\\common\\Sins of a Solar Empire Rebellion\\';
        break;
      }
    } catch {}
  }

  return sinsLocation;
}

function createWindow() {

  const electronScreen = screen;

  generateDummyCode();

  if (!store.has('modDir')) {
    sinsModDir = findSinsModFolder();
    store.set('modDir', sinsModDir);
  }

  if (!store.has('sinsDir')) {
    sinsDir = findSinsProgramFolder();
    store.set('sinsDir', sinsDir);
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

ipcMain.on('launchGameWithMod', (event, mod: Mod) => {
  fs.closeSync(fs.openSync(sinsModDir + 'EnabledMods.txt', 'w'));
  fs.writeFile(sinsModDir + 'EnabledMods.txt', mod.getEnabledMods(), (err) => {if(err) console.log(err)});

  require("child_process").execFile(sinsDir + "StardockLauncher.exe", (err, data) => {if (err) console.log(err)});
});
