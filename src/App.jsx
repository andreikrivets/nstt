import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './App.scss';
import Forms from './components/Forms';
import Header from './components/Header';
import Tags from './components/Tags';
import Notes from './components/Notes';
import CurrentFilter from './components/Filter';

import { getInitialData } from './actions';
import store from './store/store';
import ControlGroup from './components/Control';

const App = () => {
  useEffect(() => {
    store.dispatch(getInitialData);
  }, []);

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

export default App;
