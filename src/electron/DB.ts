import * as ElectronStore from 'electron-store';
import {Mod} from '../shared/models/Mod';

enum Storage {
    LAST_PLAYED_MOD = 'last_played_mod',
    STARDOCK_LAUNCHER = 'stardock_launcher',
    MODS_DIR = 'mods_dir'
}

export class DB {
    private store: ElectronStore;

    constructor() {
        this.store = new ElectronStore();
    }

    get stardockLauncher(): string {
        return this.store.get(Storage.STARDOCK_LAUNCHER) as string;
    }

    set stardockLauncher(location: string) {
        this.store.set(Storage.STARDOCK_LAUNCHER, location);
    }

    get modsDir(): string {
        return this.store.get(Storage.MODS_DIR) as string;
    }

    set modsDir(location: string) {
        this.store.set(Storage.MODS_DIR, location);
    }

    /**
     * Gets the last played mod's name
     * @return string The name of the last played mod
     */
    get lastPlayedMod(): any {
        return this.store.get(Storage.LAST_PLAYED_MOD) as string;
    }

    /**
     * Sets the last played mod
     * @param mod An instance of Mod whose name will be used to set the value
     */
    set lastPlayedMod(mod: any) {
        this.store.set(Storage.LAST_PLAYED_MOD, mod.name);
    }
}