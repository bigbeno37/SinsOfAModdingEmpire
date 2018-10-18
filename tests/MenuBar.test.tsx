import {shallow} from 'enzyme';
import MenuBar from '../src/client/components/MenuBar/MenuBar';
import * as React from 'react';
import Mod from "../src/models/Mod";
import InstallationProgress from "../src/interfaces/InstallationProgress";
import {IPCEnum} from "../src/enums/IPCEnum";

let installedMod: Mod;
let notInstalledMod: Mod;

async function waitFor(promise: Promise<any>) {
    return new Promise(resolve => {
        promise.then(() => resolve());
    });
}

describe('Menu Bar', () => {
    beforeEach(() => {
        installedMod = new Mod('', '', '', [], [], true);
        notInstalledMod = new Mod('', '', '', [], [
            {download: '', to: '', extract: ''},
            {download: '', to: '', extract: ''}
        ], false);
    });

    /**
     * Play tests
     */

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

        await waitFor(mockPromise);

        expect(menuBar.find('.btn').prop("disabled")).toBeFalsy();
    });

    /**
     * Install tests
     */

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

        await waitFor(mockPromise);

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

        await waitFor(mockPromise);

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

        await waitFor(mockPromise);

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

        await waitFor(installMockPromise);

        menuBar.find('.btn').simulate('click');

        await waitFor(launchMockPromise);

        expect(logicMock.launchStardock).toHaveBeenCalledWith(notInstalledMod);
    });

    it('shows installation bar after clicking on install', async () => {
        let logicMock: any = jest.fn();

        let update = (progress: InstallationProgress) => {};

        logicMock.installMod = jest.fn((mod, updateCb) => {
            update = updateCb;
            return new Promise(resolve => {});
        });

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        expect(menuBar.find('#progress-text').exists()).toBeFalsy();

        menuBar.find('.btn').simulate('click');

        update({type: IPCEnum.NEW_STEP, step: 1});

        expect(menuBar.find('#progress-text').exists()).toBeTruthy();
    });

    it('shows the correct step count after clicking on install', () => {
        let logicMock: any = jest.fn();

        let update = (progress: InstallationProgress) => {};

        logicMock.installMod = jest.fn((mod, updateCb) => {
            update = updateCb;
            return new Promise(resolve => {});
        });

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        menuBar.find('.btn').simulate('click');

        update({type: IPCEnum.NEW_STEP, step: 1});

        expect(menuBar.find('#progress-text').text()).toBe('0.00% - 0 B/0 B (Step 1 of 2)')
    });

    it('updates the percent and byte counter after clicking on install and downloading', () => {
        let logicMock: any = jest.fn();

        let update = (progress: InstallationProgress) => {};

        logicMock.installMod = jest.fn((mod, updateCb) => {
            update = updateCb;
            return new Promise(resolve => {});
        });

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        menuBar.find('.btn').simulate('click');

        update({type: IPCEnum.NEW_STEP, step: 1});
        update({type: IPCEnum.DOWNLOAD_STARTED, receivedBytes: 0, totalBytes: 100});

        expect(menuBar.find('#progress-text').text()).toBe('0.00% - 0 B/100 B (Step 1 of 2)');

        update({type: IPCEnum.DOWNLOAD_STARTED, receivedBytes: 50, totalBytes: 100});

        expect(menuBar.find('#progress-text').text()).toBe('50.00% - 50 B/100 B (Step 1 of 2)');
    });

    it('updates to the next step after a step has been completed', () => {
        let logicMock: any = jest.fn();

        let update = (progress: InstallationProgress) => {};

        logicMock.installMod = jest.fn((mod, updateCb) => {
            update = updateCb;
            return new Promise(resolve => {});
        });

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        menuBar.find('.btn').simulate('click');

        update({type: IPCEnum.NEW_STEP, step: 1});

        expect(menuBar.find('#progress-text').text()).toBe('0.00% - 0 B/0 B (Step 1 of 2)');

        update({type: IPCEnum.NEW_STEP, step: 2});

        expect(menuBar.find('#progress-text').text()).toBe('0.00% - 0 B/0 B (Step 2 of 2)');
    });

    it('removes progress bar after install has completed', () => {
        let logicMock: any = jest.fn();

        let update = (progress: InstallationProgress) => {};

        logicMock.installMod = jest.fn((mod, updateCb) => {
            update = updateCb;
            return new Promise(resolve => {});
        });

        const menuBar = shallow(<MenuBar selectedMod={notInstalledMod} logic={logicMock} selectedModWasInstalled={() => {}}/>);

        menuBar.find('.btn').simulate('click');

        update({type: IPCEnum.NEW_STEP, step: 1});

        expect(menuBar.find('#progress-text').text()).toBe('0.00% - 0 B/0 B (Step 1 of 2)');

        update({type: IPCEnum.DOWNLOAD_FINISHED});

        expect(menuBar.find('#progress-text').exists()).toBeFalsy();
    });
});