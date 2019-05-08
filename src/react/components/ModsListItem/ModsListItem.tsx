import * as React from 'react';
import {Col, Row} from 'reactstrap';
import {Mod} from '../../../shared/models/Mod';
import {state} from '../../State';

type props = {
    mod: Mod,
    selected: boolean
};

function ModsListItem(props: props) {
    return (
        <Row onClick={() => { state.selectedMod = props.mod; }}>
            <Col>
                <h4>{props.mod.name}</h4>
            </Col>
        </Row>
    );
}

export {ModsListItem};