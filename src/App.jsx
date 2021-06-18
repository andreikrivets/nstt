import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import './App.scss';
import Forms from './components/Forms';
import Header from './components/Header';
import Tags from './components/Tags';
import Notes from './components/Notes';
import CurrentFilter from './components/Filter';

import { getInitialData } from './actions';
import ControlGroup from './components/Control';

const App = () => {
  return (
    <Container fluid="xl">
      <Row>
        <Col className="header-wrapper">
          <Header />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <CurrentFilter />
          <Notes />
        </Col>
        <Col md>
          <Row>
            <Forms />
          </Row>
          <Row>
            <Tags />
          </Row>
        </Col>
        <Col xs={1}>
          <ControlGroup />
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getInitialData()),
  };
};

export default connect(null, mapDispatchToProps)(App);
