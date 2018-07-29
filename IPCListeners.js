"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var child_process_1 = require("child_process");
function useListeners() {
    electron_1.ipcMain.on('launchGameWithMod', function (event, mod) {
        // TODO: Change EnabledMods.txt
        child_process_1.execFile(global['sinsExe'], function (error) {
            event.sender.send('launcherClosed', '');
        });
    });
}
exports["default"] = useListeners;
