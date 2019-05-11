import {observable} from 'mobx';
import {Mod} from '../shared/models/Mod';
import EnabledModsBuilder from '../shared/EnabledModsBuilder';

class State {
    @observable mods: Mod[] = [
        new Mod('Sins of a Solar Empire: Rebellion', 'Ironclad Studios', 'The vanilla experience', new EnabledModsBuilder().toString()),
        new Mod('Star Trek: Armada III', 'Somebody', 'A star trek mod', new EnabledModsBuilder().addMod('STA3_UPRISING').toString())
    ];
    @observable selectedMod: Mod = this.mods[0];
}

export let state = new State();

export const resetState = () => {
    state = new State();
};