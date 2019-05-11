import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {ModsList} from '../ModsList/ModsList';
import {ModDetails} from '../ModDetails/ModDetails';
import styled from 'styled-components';
import {MenuBar} from '../MenuBar/MenuBar';

const ModDetailsRow = styled(Row)`
    height: 80%;
`;

const MenuBarRow = styled(Row)`
    height: 20%;
`;

export const App = () => (
    <Container fluid={true}>
        <Row>
            <Col xs={4}>
                <ModsList/>
            </Col>
            <Col xs={8}>
                <ModDetailsRow>
                    <Col>
                        <ModDetails/>
                    </Col>
                </ModDetailsRow>
                <MenuBarRow>
                    <Col>
                        <MenuBar/>
                    </Col>
                </MenuBarRow>
            </Col>
        </Row>
    </Container>
);
