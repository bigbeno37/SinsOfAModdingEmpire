import {Component} from 'react';
import * as React from 'react';
import Mod from '../../../models/Mod';
import ModsListItem from '../ModsListItem/ModsListItem';

interface props {
    mods: Mod[];
    selectedMod: Mod;
    onItemClick: (event: any) => void;
}

export default class ModsList extends Component<props> {
    render() {
        return (
            <div className="row">
                <div className="col">
                    {this.props.mods.map((mod, index) => {
                        return (
                            <div key={mod.name} className={mod === this.props.selectedMod ? "selected row" : "row"}>
                                <ModsListItem mod={mod} onClick={this.props.onItemClick} modNumber={index}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}