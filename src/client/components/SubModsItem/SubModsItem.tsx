import {Component} from 'react';
import * as React from 'react';
import SubMod from '../../../models/SubMod';

interface props {
    subMod: SubMod;
    toggleEnabled: (subMod: SubMod) => void;
}

export default class SubModsItem extends Component<props> {
    onClick = () => {
        // If the user attempts to disable a required mod, stop
        if (this.props.subMod.required) return;

        this.props.toggleEnabled(this.props.subMod);
    };

    render() {
        return (
            <a href={this.props.subMod.required ? undefined : '#'} onClick={this.onClick}>
                <div className={`col-4 ${this.props.subMod.required ? "required" : ""} ${this.props.subMod.isEnabled ? "enabled" : "disabled"}`}>
                    <h3>{this.props.subMod.name}</h3>
                </div>
            </a>
        );
    }
}