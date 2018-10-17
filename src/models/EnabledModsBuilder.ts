import * as os from 'os';

/**
 * Creates a text representation of a desired enabledMods.txt
 */
export default class EnabledModsBuilder {
    private enabledMods: string;
    private mods: string[];

    constructor() {
        this.enabledMods = `TXT${os.EOL}Version 0${os.EOL}`;
        this.mods = [];
    }

    addMod(mod: string) {
        if (mod === '') return this;

        this.mods.push(mod);

        return this;
    }

    toString() {
        this.enabledMods += `enabledModNameCount ${this.mods.length}${os.EOL}`;

        this.mods.forEach(mod => this.enabledMods += `${mod}${os.EOL}`);

        return this.enabledMods;
    }
}