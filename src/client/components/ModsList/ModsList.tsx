import {Component} from 'react';
import Mod from '../../../shared/models/Mod';
import * as React from 'react';
import ModsListItem from '../ModsListItem/ModsListItem';

type prop = {
    mods: Mod[];
    onModItemClicked: (mod: Mod) => void;
};

export default class ModsList extends Component<prop> {
    render() {
        return (
            <>
                {this.props.mods.map((mod, index) => <ModsListItem mod={mod} key={index} onModItemClicked={this.props.onModItemClicked}/>)}
            </>
        );
    }
}