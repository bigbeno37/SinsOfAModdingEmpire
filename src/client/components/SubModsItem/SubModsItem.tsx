import {Component} from 'react';
import * as React from 'react';
import SubMod from '../../../models/SubMod';

interface props {
    subMod: SubMod;
    toggleEnabled: (subMod: SubMod) => void;
}

export default class SubModsItem extends Component<props> {
    onClick = () => {
        this.props.toggleEnabled(this.props.subMod);
    };

    render() {
        return (
            <div className="col-4">
                <h3>{this.props.subMod.name}</h3>
                <input type="checkbox" defaultChecked={this.props.subMod.isEnabled}
                       disabled={this.props.subMod.required}
                       onClick={this.onClick}/>
            </div>
        );
    }
}