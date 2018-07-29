"use strict";
exports.__esModule = true;
var Mod = /** @class */ (function () {
    function Mod(name, author, description, backgroundPictures, installScript, enabledModsName, collection) {
        this.name = name;
        this.enabledModsName = enabledModsName === undefined ? name : enabledModsName;
        this.author = author;
        this.description = description;
        this.backgroundPictures = backgroundPictures;
        this.installScript = installScript;
        this.collection = collection;
        this._enabledMods = collection;
    }
    Mod.prototype.toJSON = function () {
        return {
            name: this.name,
            enabledModsName: this.enabledModsName,
            author: this.author,
            description: this.description,
            backgroundPictures: this.backgroundPictures,
            installScript: this.installScript,
            collection: this.collection
        };
    };
    return Mod;
}());
exports["default"] = Mod;
