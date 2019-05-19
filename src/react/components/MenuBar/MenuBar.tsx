import * as React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {ipcRenderer} from 'electron';
import {Channel} from '../../../shared/Channel';
import {state} from '../../State';
import {Component} from 'react';
import {observer} from 'mobx-react';

type MenuBarState = {
    disabled: boolean
};

@observer
export class MenuBar extends Component<{}, MenuBarState> {
    constructor(props: {}) {
        super(props);

        this.state = {disabled: false};
    }

    render() {
        const isInstalled = state.installedMods.includes(state.selectedMod);
        return (
            <Row>
                <Col>
                    <Button
                        color={isInstalled ? 'success' : 'primary'}
                        size={'lg'}
                        className={'text-right'}
                        disabled={this.state.disabled}
                        onClick={() => {
                            this.setState({disabled: true});
                            ipcRenderer.send(Channel.PLAY, state.selectedMod);
                            ipcRenderer.once(Channel.PLAY, () => this.setState({disabled: false}));
                        }}
                    >
                        {isInstalled ? 'Play' : 'Install'}
                    </Button>
                </Col>
            </Row>
        );
    }
}