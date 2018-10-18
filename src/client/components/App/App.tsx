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
    selectedMod: Mod;
    mods: Mod[];
}

export default class App extends Component<props, state> {

    constructor(props: props, context: any) {
        super(props, context);

        this.state = {
            selectedMod: this.props.mods[0],
            mods: this.props.mods
        };
    }

    changeSelectedMod = (newSelectedMod: Mod) => {
        this.setState({selectedMod: newSelectedMod});
    };

    toggleEnabled = (subMod: SubMod) => {
        subMod.toggleEnable();

        this.forceUpdate();
    };

    setModAsInstalled = () => {
        this.state.selectedMod.isInstalled = true;

        this.forceUpdate();
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
                            <ModDetails selectedMod={this.state.selectedMod} toggleEnabled={this.toggleEnabled}/>

                            <MenuBar selectedMod={this.state.selectedMod} selectedModWasInstalled={this.setModAsInstalled}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}