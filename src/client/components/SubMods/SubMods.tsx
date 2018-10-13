import {Component} from 'react';
import * as React from 'react';
import SubMod from '../../../models/SubMod';
import SubModsItem from '../SubModsItem/SubModsItem';

interface props {
    subMods: SubMod[];
    toggleEnabled: (subMod: SubMod) => void;
}

export default class SubMods extends Component<props> {
    render() {
        return (
            <div className="row sub-mods">
                {this.props.subMods.map(subMod => (
                    <SubModsItem key={subMod.name} subMod={subMod} toggleEnabled={this.props.toggleEnabled}/>
                ))}
            </div>
        );
    }
}