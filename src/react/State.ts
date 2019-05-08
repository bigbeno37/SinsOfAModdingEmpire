import {observable} from 'mobx';
import {Mod} from '../shared/models/Mod';

class State {
    @observable mods: Mod[] = [
        new Mod('Sins of a Solar Empire: Rebellion', 'Ironclad Studios', 'The vanilla experience'),
        new Mod('Star Trek: Armada III', 'Somebody', 'A star trek mod')
    ];
    @observable selectedMod: Mod = this.mods[0];
}

const state = new State();

export {state};