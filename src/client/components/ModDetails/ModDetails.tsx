import {Component} from 'react';
import * as React from 'react';
import Mod from '../../../models/Mod';
import SubMods from '../SubMods/SubMods';
import SubMod from '../../../models/SubMod';

interface props {
    selectedMod: Mod;
    toggleEnabled: (subMod: SubMod) => void;
}

export default class ModDetails extends Component<props> {
    render() {
        let subMods = this.props.selectedMod.subMods;
        let subModsElements = null;

        if (subMods) {
            subModsElements = (<SubMods subMods={subMods}  toggleEnabled={this.props.toggleEnabled}/>);
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <h1>{this.props.selectedMod.name}</h1>
                        <h2>{this.props.selectedMod.author}</h2>
                    </div>
                </div>

                {subModsElements}

                <div className="row">
                    <div className="col text-justify">
                        <p>{this.props.selectedMod.description}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}