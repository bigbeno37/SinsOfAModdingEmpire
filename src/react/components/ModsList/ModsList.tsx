import * as React from 'react';
import {state} from '../../State';
import {Col, Row} from 'reactstrap';
import {ModsListItem} from '../ModsListItem/ModsListItem';

export const ModsList = () => (
    <Row>
        <Col>
            {state.mods.map(mod => (
                <ModsListItem mod={mod} key={mod.name}/>
            ))}
        </Col>
    </Row>
);