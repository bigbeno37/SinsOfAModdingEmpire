import {Component} from 'react';
import Mod from '../../../shared/models/Mod';
import * as React from 'react';

type props = {
    mod: Mod
    onModItemClicked: (mod: Mod) => void;
};

export default class ModsListItem extends Component<props> {
    render() {
        return (
            <div className={'row'} onClick={() => this.props.onModItemClicked(this.props.mod)}>
                <div className={'modsListItem'}>
                    <h4>{this.props.mod.name}</h4>
                </div>
            </div>
        );
    }
}