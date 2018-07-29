import { app, BrowserWindow, screen, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import Mod from './models/Mod';
import * as fs from 'fs';
import * as request from 'request-promise-native';
import useListeners from './IPCListeners';

const Store = require('electron-store');
const store = new Store();
const isOnline = require('is-online');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');


const stardockLauncher = 'steamapps/common/Sins of a Solar Empire Rebellion/StardockLauncher.exe';
const commonDrive: string[] = ['C:', 'D:', 'E:', 'F:'];

/**
 * Called by getStardockLauncher, responsible for automatically finding the Stardock Launcher executable
 * @return string|null Location of Stardock Launcher executable
 */
function findStardockLauncher(): string | null {
  const commonPath: string[] = [
    `/Program Files (x86)/Steam/steamapps/${stardockLauncher}`,
    `/Program Files/Steam/${stardockLauncher}`,
    `/SteamLibrary/${stardockLauncher}`
  ];

  for (const drive of commonDrive) {
    for (const pathName of commonPath) {
      const checkPath = `${drive}${pathName}`;
      if (fs.existsSync(checkPath)) {
        return checkPath;
      }
    }
  }

  return null;
}

/**
 * Called by getModDir, responsible for automatically finding the Sins mod directory
 * @return string|null Location of the Sins mod directory
 */
function findModDir(): string | null {
  // Using the user setting to check if the mod folder exists
  const checkMod = '/Documents/My Games/Ironclad Games/Sins of a Solar Empire Rebellion/Mods-Rebellion v1.85/EnabledMods.txt';

  for (const drive of commonDrive) {
    const checkPath = `${drive}/Users/${process.env.USERNAME}${checkMod}`;

    if (fs.existsSync(checkPath)) {
      return checkPath.replace('EnabledMods.txt', '');
    }
  }

  return null;
}

/**
 * Determines the location of the Stardock Launcher executable. Calls findStardockLauncher, and if it returns null, will prompt
 * the user to manually navigate to it
 * @return string The location of the Stardock Launcher executable
 */
function getStardockLauncher(): string {
  const foundFile = findStardockLauncher();

  // If SoaME is able to automatically find the Sins exe file, don't prompt the user
  if (foundFile) {
    return foundFile;
  }

  // Unable to find Sins exe, so prompt user to select it
  dialog.showMessageBox({
    type: 'error',
    message: 'Unable to automatically find the Stardock Launcher executable! Please select it.'
  });

  const file = dialog.showOpenDialog({
    title: 'Select Sins exe',
    filters: [
      {name: 'exe', extensions: ['exe']}
    ]
  })[0];

  // If the file selected is not the correct Sins exe, ask again
  if (!(file.split('\\').pop() === 'StardockLauncher.exe')) {
    return getStardockLauncher();
  }

  // File selected is correct Sins exe, return
  return file;
}

/**
 * Determines the location of the Sins mod directory. Calls findModDir, and if it returns null, will prompt
 * the user to manually navigate to it
 * @return string The location of the Sins mod directory
 */
function getModsDir() {
  const foundDir = findModDir();

  if (foundDir) {
    return foundDir;
  }

  // Unable to find mods directory, prompt the user to select it
  dialog.showMessageBox({
    type: 'error',
    message: 'Unable to automatically find the Sins of a Solar Empire mods directory! Please select it.'
  });

  const dir = dialog.showOpenDialog({
    title: 'Select Mod Directory',
    properties: [
      'openDirectory'
    ]
  })[0];

  // If the directory selected is not the correct directory, ask again
  if (!(dir.split('\\').pop() === 'Mods-Rebellion v1.85')) {
      console.log(dir);

    return getModsDir();
  }

  // File selected is correct Sins exe, return
  return dir;
}


/**
 * The main function that drives SoaME. First determines the location of the Stardock Launcher executable, followed by
 * finding the Sins mod directory, obtaining the latest mods.json from the master branch on SoaME's repository, and
 * finally loading src/index.html in electron
 */
async function createWindow() {
  // If debug
  store.delete('sinsExe');
  store.delete('modDir');

  useListeners();

  // Determine location of sins exe and mod directory
  if (!store.has('sinsExe')) {
    store.set('sinsExe', getStardockLauncher());
  }

  global['sinsExe'] = store.get('sinsExe');

  if (!store.has('sinsModDir')) {
    store.set('modDir', getModsDir());
  }

  global['modDir'] = store.get('modDir');

  let modsJson;

  try {
    if (await isOnline()) {
      modsJson = await request.get('https://raw.githubusercontent.com/bigbeno37/SinsOfAModdingEmpire/master/data/mods.json');
    }
  } catch (error) {
    modsJson = fs.readFileSync('data/mods.json', 'utf8');
  }

  const mods: Mod[] = [];

  JSON.parse(modsJson)
    .forEach(mod => {
      mods.push(new Mod(mod.name, mod.author, mod.description, mod.backgroundPictures, mod.installScript));
    });

  global['mods'] = mods;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1920,
    height: 1080
  });

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools();

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






// import { app, BrowserWindow, screen, ipcMain } from 'electron';
// import * as path from 'path';
// import {Mod} from "./src/models/Mod";
// import STA3 from "./src/mods/STA3";
//
//
// let win, serve;
// const args = process.argv.slice(1);
// const Store = require('electron-store');
// const store = new Store();
// const fs = require('fs');
// const Finder = require('fs-finder');
// serve = args.some(val => val === '--serve');
//
//
// let sinsModDir = "";
// let sinsDir = "";
//
//
// if (serve) {
//   require('electron-reload')(__dirname, {
//   });
// }
//
// function generateDummyCode() {
//   store.delete('mods');
//
//   if (!store.has('mods')) {
//
//     let mods: Mod[] = [new Mod("Sins of a Solar Empire: Rebellion", "Stardock", "The vanilla experience", ["AdventExtermination.png"], [])];
//     mods.push(STA3);
//
//     // TODO
//     // Change to []
//     store.set('mods', mods);
//   }
//
//   store.delete('modDir');
//   store.delete('sinsDir');
// }
//
// function findSinsModFolder(): string {
//   let drives: string[] = ['C', 'D', 'E'];
//   let modsLocation: string;
//
//   for (let drive of drives) {
//     try {
//       let currentDir: string[] = Finder.in(drive + ':/Users/' + require("os").userInfo().username + '/Documents/').findDirectories('My Games');
//
//       if (currentDir.length > 0) {
//         modsLocation = currentDir[0] + '\\Ironclad Games\\Sins of a Solar Empire Rebellion\\Mods-Rebellion v1.85\\';
//         break;
//       }
//     } catch {}
//   }
//
//   return modsLocation;
// }
//
// function findSinsProgramFolder(): string {
//   let drives: string[] = ['C', 'D', 'E'];
//   let sinsLocation: string;
//
//   for (let drive of drives) {
//     try {
//       let currentDir: string[] = Finder.in(drive + ':/SteamLibrary/').findDirectories('steamapps');
//
//       if (currentDir.length > 0) {
//         sinsLocation = currentDir[0] + '\\common\\Sins of a Solar Empire Rebellion\\';
//         break;
//       }
//     } catch {}
//   }
//
//   return sinsLocation;
// }
//
// function createWindow() {
//
//   const electronScreen = screen;
//
//   generateDummyCode();
//
//   if (!store.has('modDir')) {
//     sinsModDir = findSinsModFolder();
//     store.set('modDir', sinsModDir);
//   }
//
//   if (!store.has('sinsDir')) {
//     sinsDir = findSinsProgramFolder();
//     store.set('sinsDir', sinsDir);
//   }
//
//   global['mods'] = store.get('mods');
//
//   // Create the browser window.
//   win = new BrowserWindow({
//     x: 0,
//     y: 0,
//     width: 1280,
//     height: 720
//   });
//
//   // and load the index.html of the app.
//   win.loadURL('file://' + __dirname + '/index.html');
//
//   // Open the DevTools.
//   if (serve) {
//     win.webContents.openDevTools();
//   }
//
//   // Emitted when the window is closed.
//   win.on('closed', () => {
//     // Dereference the window object, usually you would store window
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     win = null;
//   });
// }
//
// try {
//
//   // This method will be called when Electron has finished
//   // initialization and is ready to create browser windows.
//   // Some APIs can only be used after this event occurs.
//   app.on('ready', createWindow);
//
//   // Quit when all windows are closed.
//   app.on('window-all-closed', () => {
//     // On OS X it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform !== 'darwin') {
//       app.quit();
//     }
//   });
//
//   app.on('activate', () => {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (win === null) {
//       createWindow();
//     }
//   });
//
// } catch (e) {
//   // Catch Error
//   // throw e;
// }
//
// ipcMain.on('launchGameWithMod', (event, mod: Mod) => {
//   fs.closeSync(fs.openSync(sinsModDir + 'EnabledMods.txt', 'w'));
//   fs.writeFile(sinsModDir + 'EnabledMods.txt', mod.getEnabledMods(), (err) => {if(err) console.log(err)});
//
//   require("child_process").execFile(sinsDir + "StardockLauncher.exe", (err, data) => {if (err) console.log(err)});
// });
