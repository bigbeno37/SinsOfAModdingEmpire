import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {ModsList} from '../ModsList/ModsList';
import {ModDetails} from '../ModDetails/ModDetails';

export class App extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
            <Col xs={4}>
                <ModsList/>
            </Col>
            <Col xs={8}>
                <ModDetails/>
            </Col>
        </Row>
      </Container>
    );
  }
}
