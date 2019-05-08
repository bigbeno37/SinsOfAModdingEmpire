import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import {state} from '../../State';
import {Col, Row} from 'reactstrap';
import {ModsListItem} from '../ModsListItem/ModsListItem';

@observer
export class ModsList extends Component {
    render() {
        return (
            <Row>
                <Col>
                    {state.mods.map(mod => (
                        <ModsListItem mod={mod} selected={mod === state.selectedMod} key={mod.name}/>
                    ))}
                </Col>
            </Row>
        );
    }
}