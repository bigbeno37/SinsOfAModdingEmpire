"use strict";
exports.__esModule = true;
var os = require("os");
function enabledMods(mod) {
    var mods = [];
    if (mod.name !== 'Sins of a Solar Empire: Rebellion') {
        if (mod.collection === undefined) {
            mods.push({ name: mod.name, enabledModsName: mod.enabledModsName, required: true });
        }
        else {
            mod.collection.forEach(function (modItem) {
                mods.push(modItem);
            });
        }
    }
    if (mods.length <= 0) {
        return "TXT" + os.EOL + "Version 0" + os.EOL + "enabledModNameCount 0";
    }
    else {
        var enabledModsText_1 = "TXT" + os.EOL + "Version 0" + os.EOL + "enabledModNameCount " + mods.length;
        mods.forEach(function (modItem) {
            enabledModsText_1 += os.EOL + "enabledModName \"" + (modItem.enabledModsName === undefined ? modItem.name : modItem.enabledModsName) + "\"";
        });
        return enabledModsText_1;
    }
}
exports["default"] = enabledMods;
