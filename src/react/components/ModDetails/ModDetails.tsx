import * as React from 'react';
import {Component} from 'react';
import {Col, Row} from 'reactstrap';
import {observer} from 'mobx-react';
import {state} from '../../State';

@observer
export class ModDetails extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <h1>{state.selectedMod.name}</h1>
                </Col>
            </Row>
        );
    }
}