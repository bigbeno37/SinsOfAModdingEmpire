import * as React from 'react';
import {Col, Row} from 'reactstrap';
import {observer} from 'mobx-react';
import {state} from '../../State';

export const ModDetails = observer(() => (
    <Row>
        <Col>
            <h1>{state.selectedMod.name}</h1>
            <h2>{state.selectedMod.author}</h2>
            <p>{state.selectedMod.description}</p>
        </Col>
    </Row>
));