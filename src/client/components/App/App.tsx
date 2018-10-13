import {Component} from 'react';
import * as React from 'react';
import Mod from '../../../models/Mod';
import ModsList from '../ModsList/ModsList';
import ModDetails from '../ModDetails/ModDetails';
import MenuBar from '../MenuBar/MenuBar';
import SubMod from '../../../models/SubMod';

interface props {
    mods: Mod[];
}

interface state {
    selectedMod: number;
    mods: Mod[];
}

export default class App extends Component<props, state> {

    constructor(props: props, context: any) {
        super(props, context);

        this.state = {
            selectedMod: 0,
            mods: this.props.mods
        };
    }

    changeSelectedMod = (newSelectedMod: number) => {
        this.setState({selectedMod: newSelectedMod});
    };

    toggleEnabled = (subMod: SubMod) => {
        let newMods = [...this.state.mods];
        let newSubMod = newMods[this.state.selectedMod].subMods.find(sub => sub === subMod);

        if (newSubMod) {
            newSubMod.toggleEnable();
        }

        this.setState({mods: newMods});
    };

    setModAsInstalled = () => {
        let newMods = [...this.state.mods];

        newMods[this.state.selectedMod].isInstalled = true;

        this.setState({mods: newMods});
    };

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <ModsList mods={this.state.mods} selectedMod={this.state.selectedMod} onItemClick={this.changeSelectedMod}/>
                        </div>

                        <div className="col d-flex align-items-start flex-column mod-details-menu">
                            <ModDetails selectedMod={this.state.mods[this.state.selectedMod]} toggleEnabled={this.toggleEnabled}/>

                            <MenuBar selectedMod={this.state.mods[this.state.selectedMod]} setModAsInstalled={this.setModAsInstalled}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}