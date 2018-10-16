import {shallow} from 'enzyme';
import MenuBar from '../src/client/components/MenuBar/MenuBar';
import * as React from 'react';
import Mod from "../src/models/Mod";

let installedMod: Mod;
let notInstalledMod: Mod;

describe('Menu Bar', () => {
    beforeEach(() => {
        installedMod = new Mod('', '', '', [], [], true);
        notInstalledMod = new Mod('', '', '', [], [], false);
    });

    it('shows play when mod is installed', () => {
        const menuBar = shallow(<MenuBar selectedMod={installedMod} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').text()).toBe('Play');
    });

    it('can be clicked on when mod is installed', () => {
        const menuBar = shallow(<MenuBar selectedMod={installedMod} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();
    });

    it('calls launchStardock in logic after play is clicked', () => {
        let logicMock: any = jest.fn();
        logicMock.launchStardock = jest.fn();

        const menuBar = shallow(<MenuBar selectedMod={installedMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        menuBar.find('.btn').simulate('click');

        expect(logicMock.launchStardock).toHaveBeenCalledWith(installedMod);
    });

    it('disables the play button after clicking it', () => {
        let logicMock: any = jest.fn();

        let mockPromise = new Promise(resolve => {});

        logicMock.launchStardock = jest.fn(() => mockPromise);

        const menuBar = shallow(<MenuBar selectedMod={installedMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();

        menuBar.find('.btn').simulate('click');

        expect(menuBar.find('.btn').prop("disabled")).toBeTruthy();
    });

    it('reenables the play button once launchStardock resolves', async () => {
        let logicMock: any = jest.fn();

        let mockResolve = () => {};
        let mockPromise = new Promise(resolve => {mockResolve = resolve;});

        logicMock.launchStardock = jest.fn(() => mockPromise );

        const menuBar = shallow(<MenuBar selectedMod={installedMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();

        menuBar.find('.btn').simulate('click');

        expect(menuBar.find('.btn').prop("disabled")).toBeTruthy();

        mockResolve();

        // Why do we need to wrap in a promise? Who knows
        await new Promise((resolve) => {
            mockPromise.then(() => resolve());
        });

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();
    });

    it('shows install when mod is not installed', () => {
        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').text()).toBe('Install');
    });

    it('can be clicked when mod is not installed', () => {
        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod}  selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();
    });

    it('calls installMod in logic after install is pressed', () => {
        let logicMock: any = jest.fn();
        logicMock.installMod = jest.fn();

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock}  selectedModWasInstalled={() => {}}/>);

        menuBar.find('.btn').simulate('click');

        expect(logicMock.installMod.mock.calls[0]).toContain(notInstalledMod);
    });

    it('changes text to Installing... after clicking on Install', () => {
        let logicMock: any = jest.fn();
        logicMock.installMod = jest.fn();

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').text()).toBe('Install');

        menuBar.find('.btn').simulate('click');

        expect(menuBar.find('.btn').text()).toBe('Installing...');
    });

    it('reenables button after installMod resolves', async () => {
        let logicMock: any = jest.fn();

        let mockResolve = () => {};
        let mockPromise = new Promise(resolve => {mockResolve = resolve;});

        logicMock.installMod = jest.fn(() => mockPromise );

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();

        menuBar.find('.btn').simulate('click');

        expect(menuBar.find('.btn').prop("disabled")).toBeTruthy();

        mockResolve();

        // Why do we need to wrap in a promise? Who knows
        await new Promise((resolve) => {
            mockPromise.then(() => resolve());
        });

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();
    });

    it('calls selectedModWasInstalled after installMod resolves', async () => {
        let logicMock: any = jest.fn();
        let smwiMock: any = jest.fn();

        let mockPromise = new Promise(resolve => resolve());

        logicMock.installMod = jest.fn(() => mockPromise);

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock}
                                         selectedModWasInstalled={smwiMock}/>);

        menuBar.find('.btn').simulate('click');

        await new Promise(resolve => {
            mockPromise.then(() => resolve());
        });

        expect(smwiMock).toHaveBeenCalled();
    });

    it('changes text to Play after mod has installed', async () => {
        let logicMock: any = jest.fn();

        let mockPromise = new Promise(resolve => resolve());

        logicMock.installMod = jest.fn(() => mockPromise);

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock}
                                         selectedModWasInstalled={() => { notInstalledMod.isInstalled = true }}/>);

        expect(menuBar.find('.btn').text()).toBe('Install');

        menuBar.find('.btn').simulate('click');

        await new Promise(resolve => {
            mockPromise.then(() => resolve());
        });

        expect(menuBar.find('.btn').text()).toBe('Play');
    });

    it('calls launchStardock after mod has been installled and Play is clicked', async () => {
        let logicMock: any = jest.fn();

        let installMockPromise = new Promise(resolve => resolve());
        let launchMockPromise = new Promise(resolve => resolve());

        logicMock.installMod = jest.fn(() => installMockPromise);
        logicMock.launchStardock = jest.fn(() => launchMockPromise);

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock}
                                         selectedModWasInstalled={() => { notInstalledMod.isInstalled = true }}/>);

        menuBar.find('.btn').simulate('click');

        await new Promise(resolve => {
            installMockPromise.then(() => resolve());
        });

        menuBar.find('.btn').simulate('click');

        await new Promise(resolve => {
            launchMockPromise.then(() => resolve());
        });

        expect(logicMock.launchStardock).toHaveBeenCalledWith(notInstalledMod);
    });
});