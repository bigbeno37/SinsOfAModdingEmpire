import {shallow, ShallowWrapper} from 'enzyme';
import MenuBar from '../../src/client/components/MenuBar/MenuBar';
import * as React from 'react';
import Mod from '../../src/shared/models/Mod';

import Utils from '../../src/client/misc/Utils';
jest.mock('../../src/client/Utils');
Utils.storeGet = jest.fn(() => ['']);

const mod = new Mod('name', 'author', 'description', '', []);

let menuBar: ShallowWrapper;

describe('Menu Bar', () => {
    beforeEach(() => {
        menuBar = shallow(<MenuBar selectedMod={mod}/>);
    });

    it('disables the Play button after isPlaying is false', () => {
        menuBar.setState({isInstalled: true});
        expect(menuBar.find('button').prop('disabled')).toBeFalsy();

        menuBar.setState({isPlaying: true});

        expect(menuBar.find('button').prop('disabled')).toBeTruthy();
    });

    it('reenables the Play button after isPlaying is set to true from false', () => {
        menuBar.setState({isInstalled: true});
        menuBar.setState({isPlaying: true});

        expect(menuBar.find('button').prop('disabled')).toBeTruthy();

        menuBar.setState({isPlaying: false});

        expect(menuBar.find('button').prop('disabled')).toBeFalsy();
    });

    it('changes the text to Playing... when isPlaying is set to true', () => {
        menuBar.setState({isInstalled: true});
        expect(menuBar.find('button').text()).toBe('Play');

        menuBar.setState({isPlaying: true});

        expect(menuBar.find('button').text()).toBe('Playing...');
    });

    it('changes the text to Play when isPlaying is set to false', () => {
        menuBar.setState({isInstalled: true});
        menuBar.setState({isPlaying: true});

        expect(menuBar.find('button').text()).toBe('Playing...');

        menuBar.setState({isPlaying: false});

        expect(menuBar.find('button').text()).toBe('Play');
    });

    it('sets isPlaying to true after clicking the Play button', () => {
        menuBar.setState({isInstalled: true});
        expect(menuBar.state('isPlaying')).toBeFalsy();

        menuBar.find('button').simulate('click');

        expect(menuBar.state('isPlaying')).toBeTruthy();
    });

    it('sets isPlaying to false after receiving the IPC callback', () => {
        menuBar.setState({isInstalled: true});
        menuBar.find('button').simulate('click');

        expect(menuBar.state('isPlaying')).toBeTruthy();

        (menuBar.instance() as MenuBar).stardockLauncherClosed();

        expect(menuBar.state('isPlaying')).toBeFalsy();
    });

    it('shows the Install button if installed is false', () => {
        menuBar.setState({isInstalled: false});

        expect(menuBar.find('button').text()).toBe('Install');
    });

    it('shows the Play button if installed is true', () => {
        menuBar.setState({isInstalled: true});

        expect(menuBar.find('button').text()).toBe('Play');
    });
});