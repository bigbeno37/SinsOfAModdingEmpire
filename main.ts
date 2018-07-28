import { app, BrowserWindow, screen, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { Mod } from "./models/Mod";
import * as fs from 'fs';

const Store = require('electron-store');
const isOnline = require('is-online');
const request = require('request');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

let store = new Store();

const commonDrive: string[] = ["C:", "D:", "E:", "F:"]
const commonPath: string[] = ["/Program Files (x86)/Steam/steamapps/common/Sins of a Solar Empire Rebellion/Sins of a Solar Empire Rebellion.exe", 
  "/Program Files/Steam/steamapps/common/Sins of a Solar Empire Rebellion/Sins of a Solar Empire Rebellion.exe", 
  "/SteamLibrary/steamapps/common/Sins of a Solar Empire Rebellion/Sins of a Solar Empire Rebellion.exe"];

async function findSinsExe() {
  return new Promise(async resolve => {
    for(var i in commonDrive){
      for(var j in commonPath){
        let temporary: string = commonDrive[i]+commonPath[j];

        if (await checkFileExists(temporary)) {
          resolve(temporary);
        }
      }
    }

    // Gone through all files, return null
    resolve(null);
  });
}

async function checkFileExists(file) {
  return new Promise(resolve => {
    fs.access(file, fs.constants.F_OK, error => { 
      resolve(error ? false : true);
    });
  });
}

async function getSinsExe() {
  let foundFile = await findSinsExe();

  // If SoaME is able to automatically find the Sins exe file, don't prompt the user
  if (foundFile) {
    return foundFile;
  }

  // Unable to find Sins exe, so prompt user to select it
  let file = dialog.showOpenDialog({
    title: 'Select Sins exe',
    filters: [
      {name: 'exe', extensions: ['exe']}
    ]
  })[0];

  // If the file selected is not the correct Sins exe, ask again
  if (!(file.split('\\').pop() === 'StardockLauncher.exe')) {
    return getSinsExe();
  }

  // File selected is correct Sins exe, return
  return file;
}

// TODO: Magically find the sins mod directory
function findModDir(): string | null {
  return null;
}

function getModsDir() {
  let foundDir = findModDir();

  if (foundDir) {
    return foundDir;
  }

  let dir = dialog.showOpenDialog({
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




function createWindow() {
  // If debug
  if (true) {
    store.delete('sinsExe');
    store.delete('modDir');
  }

  // Determine location of sins exe and mod directory
  if (!store.has('sinsExe')) {
    store.set('sinsExe', getSinsExe());
  }

  // if (!store.has('sinsModDir')) {
  //   store.set('modDir', getModsDir());
  // }

  new Promise(resolve => {
    // Check to see if new mods are available
    isOnline().then(online => {

      // If online, download latest mods.json
      if (online) {
        request.get('https://raw.githubusercontent.com/bigbeno37/SinsOfAModdingEmpire/master/data/mods.json', (error, response, body) => {
          // If there were no errors in transmission, continue
          if (!error && response.statusCode == 200) {
            let mods: Mod[] = [];

            JSON.parse(body).forEach(element => {
              mods.push(new Mod(element.name, element.author, element.description, element.backgroundPictures, element.installScript));
            });

            global['mods'] = mods;

            resolve();
          }
        });
      }
      else {
        // Not online, use local mods
        throw new Error('Offline');
      }
    });
  })
  .catch(() => {
    global['mods'] = [
      new Mod("Sins of a Solar Empire: Rebellion", "Stardock", "The vanilla experience", ["AdventExtermination.png"], []),
      new Mod("Star Trek: Armada III", "Somebody", "A star trek mod!", ["ArmadaIII.jpg"],[])
    ];
  })
  .then(() => {
    // Create the browser window.
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
