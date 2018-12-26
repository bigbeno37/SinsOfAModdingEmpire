import {Component} from 'react';
import Mod from '../../../shared/models/Mod';
import * as React from 'react';

type props = {
    selectedMod: Mod;
};

export default class ModDetails extends Component<props> {
    render() {
        return (
            <div className={'row'}>
                <div className={'col'}>
                    <h1>{this.props.selectedMod.name}</h1>
                    <h2>{this.props.selectedMod.author}</h2>
                    <p>{this.props.selectedMod.description}</p>
                </div>
            </div>
        );
    }
}