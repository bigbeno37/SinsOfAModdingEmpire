import * as ElectronStore from 'electron-store';
import {Mod} from '../shared/models/Mod';
import EnabledModsBuilder from '../shared/EnabledModsBuilder';
import {IMod} from '../shared/models/IMod';

enum Storage {
    MODS = 'mods',
    INSTALLED_MODS = 'installed_mods',
    LAST_PLAYED_MOD = 'last_played_mod',
    STARDOCK_LAUNCHER = 'stardock_launcher',
    MODS_DIR = 'mods_dir'
}

export class DB {
    private store: ElectronStore;
    private _mods: Mod[];

    constructor() {
        this.store = new ElectronStore();
    }

    private getOrSetDefault<T>(key: string, defaultValue: T) {
        if (!this.store.has(key)) {
            this.store.set(key, defaultValue);
        }

        return this.store.get(key) as T;
    }

    private getMods(): IMod[] {
        return this.getOrSetDefault(Storage.MODS,
            [
                {
                    name: 'Sins of a Solar Empire: Rebellion',
                    author: 'Ironclad Studios',
                    description: 'The vanilla experience',
                    enabledMods: new EnabledModsBuilder().toString()
                },
                {
                    name: 'Star Trek: Armada III',
                    author: 'Somebody',
                    description: 'A star trek mod',
                    enabledMods: new EnabledModsBuilder().addMod('STA3_UPRISING').toString()
                }
            ]
        );
    }

    get mods(): Mod[] {
        if (!this._mods) {
            this._mods = this.getMods().map(mod => Mod.createInstanceFrom(mod));
        }
        return this._mods;
    }

    get stardockLauncher(): string {
        return this.getOrSetDefault(Storage.STARDOCK_LAUNCHER, '');
}

    set stardockLauncher(location: string) {
        this.store.set(Storage.STARDOCK_LAUNCHER, location);
    }

    get modsDir(): string {
        return this.getOrSetDefault(Storage.MODS_DIR, '');
    }

    set modsDir(location: string) {
        this.store.set(Storage.MODS_DIR, location);
    }

    private getLastPlayedMod(): string {
        return this.getOrSetDefault(Storage.LAST_PLAYED_MOD, this.mods[0].name);
    }

    get lastPlayedMod(): Mod {
        return this.mods.find(mod => mod.name === this.getLastPlayedMod()) as Mod;
    }

    set lastPlayedMod(mod: Mod) {
        this.store.set(Storage.LAST_PLAYED_MOD, mod.name);
    }

    private getInstalledMods(): string[] {
        return this.getOrSetDefault(Storage.INSTALLED_MODS, [this.mods[0].name]);
    }

    get installedMods(): Mod[] {
        // Return a list of mods whose name appears in the list of installed mods
        return this.mods.filter(mod => this.getInstalledMods().find(installedMod => mod.name === installedMod) !== undefined);
    }

    addInstalledMod(mod: Mod) {
        this.store.set(Storage.INSTALLED_MODS, [...this.getInstalledMods(), mod.name]);
    }
}