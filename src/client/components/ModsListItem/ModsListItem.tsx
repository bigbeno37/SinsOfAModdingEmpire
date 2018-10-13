import {Component} from 'react';
import * as React from 'react';
import Mod from '../../../models/Mod';

interface props {
    mod: Mod;
    modNumber: number
    onClick: (newSelectedMod: number) => void;
}

export default class ModsListItem extends Component<props> {
    itemClick = () => {
        this.props.onClick(this.props.modNumber);
    };

    render() {
        return (
            <div className="col" onClick={this.itemClick}>
                <h1>{this.props.mod.name}</h1>
            </div>
        );
    }
}