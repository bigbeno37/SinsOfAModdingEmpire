import {observable} from 'mobx';
import {Mod} from '../shared/models/Mod';
import {DB} from '../electron/DB';

const db = new DB();

class State {
    @observable mods: Mod[] = db.mods;
    @observable selectedMod: Mod = this.mods.find(mod => mod === db.lastPlayedMod) as Mod;
    @observable installedMods: Mod[] = db.installedMods;
}

export let state = new State();

export const resetState = () => {
    state = new State();
};

export const refreshState = () => {
    state.mods = db.mods;
    state.selectedMod = state.mods.find(mod => mod === db.lastPlayedMod) as Mod;
    state.installedMods = db.installedMods;
};