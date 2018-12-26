import * as React from 'react';
import ModDetails from '../ModDetails/ModDetails';
import Mod from '../../../shared/models/Mod';
import {Component} from 'react';
import MenuBar from '../MenuBar/MenuBar';
import ModsList from '../ModsList/ModsList';
import Store = require('electron-store');
import {DB} from '../../../shared/enums/DB';

const store = new Store();

type props = {
    mods: Mod[];
};

type state = {
    selectedMod: Mod;
};

export class App extends Component<props, state> {
    constructor(props: props, context: any) {
        super(props, context);

        // Set the current mod to the one that was previously loaded. If no mod has been run before or some other issue,
        // the default sins option will be selected
        this.state = {
            selectedMod: this.props.mods.find(mod => mod.name === store.get(DB.SELECTED_MOD)) || this.props.mods[0]
        };
    }

    onModItemClicked = (mod: Mod) => {
        this.setState({selectedMod: mod});
    };

    render() {
        return (
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-4'}>
                        <ModsList mods={this.props.mods} onModItemClicked={this.onModItemClicked}/>
                    </div>
                    <div className={'col-8 d-flex flex-column'}>
                        <ModDetails selectedMod={this.state.selectedMod}/>
                        <MenuBar selectedMod={this.state.selectedMod}/>
                    </div>
                </div>
            </div>
        );
    }
}
