import * as React from 'react';
import {Col, Row} from 'reactstrap';
import {Mod} from '../../../shared/models/Mod';
import {state} from '../../State';
import styled from 'styled-components';

type props = {
    mod: Mod
};

type StyledRowProps = {
    active: boolean
};

export const StyledRow = styled(Row)`
    border-right: ${(props: StyledRowProps) => props.active ? '1' : '0'}px solid green;
`;

export const ModsListItem = (props: props) => {
    return (
        <StyledRow onClick={() => { state.selectedMod = props.mod; }}>
            <Col>
                <h4>{props.mod.name}</h4>
            </Col>
        </StyledRow>
    );
};