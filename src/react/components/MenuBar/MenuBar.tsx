import * as React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {ipcRenderer} from 'electron';
import {Channel} from '../../../shared/Channel';
import {state} from '../../State';
import {Component} from 'react';

type state = {
    disabled: boolean
};

export class MenuBar extends Component<{}, state> {
    constructor(props: {}) {
        super(props);

        this.state = {disabled: false};
    }

    render() {
        return (
            <Row>
                <Col>
                    <Button
                        color={'success'}
                        size={'lg'}
                        className={'text-right'}
                        disabled={this.state.disabled}
                        onClick={() => {
                            this.setState({disabled: true});
                            ipcRenderer.send(Channel.PLAY, state.selectedMod);
                            ipcRenderer.once(Channel.PLAY, () => this.setState({disabled: false}));
                        }}
                    >
                        Play
                    </Button>
                </Col>
            </Row>
        );
    }
}