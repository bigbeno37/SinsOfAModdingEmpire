"use strict";
exports.__esModule = true;
var Mod = /** @class */ (function () {
    function Mod(name, author, description, backgroundPictures, installScript) {
        this.installScript = [];
        this.name = name;
        this.author = author;
        this.description = description;
        this.backgroundPictures = backgroundPictures;
        this.installScript = installScript;
    }
    Mod.prototype.getRequiredMods = function (script) {
        var requiredMods = [];
        for (var _i = 0, script_1 = script; _i < script_1.length; _i++) {
            var line = script_1[_i];
            // If the current line contains an extraction call AND is to be added to EnabledMods...
            if (line.indexOf("from") !== -1 && line.indexOf("do not add to EnabledMods") === -1) {
                var splitLine = line.split(" ");
                // Go through each word in the line
                for (var word in splitLine) {
                    // If the current word is folder...
                    if (splitLine[word].localeCompare("folder") === 0) {
                        // Add the next word to the RequiredMods array
                        requiredMods.push(splitLine[word + 1]);
                        break;
                        // Otherwise if the current word is files...
                    }
                    else if (splitLine[word].localeCompare("files") === 0) {
                        // Add two words over to the RequiredMods array
                        requiredMods.push(splitLine[word + 2]);
                        break;
                    }
                }
            }
        }
        return requiredMods;
    };
    Mod.prototype.getEnabledMods = function () {
        var requiredMods = this.getRequiredMods(this.installScript);
        var enabledMods = "TXT\nVersion 0\nenabledModNameCount " + requiredMods.length + "\n";
        for (var _i = 0, requiredMods_1 = requiredMods; _i < requiredMods_1.length; _i++) {
            var mod = requiredMods_1[_i];
            enabledMods += 'enabledModName "' + mod + '"\n';
        }
        return enabledMods;
    };
    return Mod;
}());
exports.Mod = Mod;
/*

INSTALLATION SCRIPT
require STA3-full-mod.zip as sta3, patch11.zip as patch

from sta3 extract folder STA3 to MODS
from sta3 extract folder GalaxyForge to MODS and do not add to EnabledMods
from patch extract files in ROOT to MODS/STA3 and overwrite and do not add to EnabledMods

 */
