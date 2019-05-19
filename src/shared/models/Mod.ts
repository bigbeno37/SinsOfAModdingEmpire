import {IMod} from './IMod';

export class Mod {
    public name: string;
    public author: string;
    public description: string;
    public enabledMods: string;

    public static createInstanceFrom(mod: IMod) {
        return new Mod(mod.name, mod.author, mod.description, mod.enabledMods);
    }

    constructor(name: string, author: string, description: string, enabledMods: string) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.enabledMods = enabledMods;
    }
}