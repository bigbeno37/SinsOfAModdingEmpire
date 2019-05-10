import * as ElectronStore from 'electron-store';

enum Storage {
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
}