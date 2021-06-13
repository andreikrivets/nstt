import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Alert } from 'react-bootstrap';

import './App.scss';
import Forms from './components/Forms';
import Header from './components/Header';
import Tags from './components/Tags';
import Notes from './components/Notes';
import CurrentFilter from './components/Filter';

import storage from './data/storage.json';
import getTagsFromInitialText from './utils/getTagsFromInitialText';
import getFiltredData from './utils/getFiltredData';
import getMockData from './utils/getMockData';
import { applyFilter, resetFilter, removeFilter } from './utils/filter/filterOperations';

const App = () => {
  const [data, setData] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [mode, setMode] = useState('edit');
  const [filter, setFilter] = useState({ data: {}, state: false, tags: [] });

  const [alertSection, setAlertSection] = useState({ show: false, message: '' });

  useEffect(() => {
    setData(getTagsFromInitialText(storage));
  }, []);

  const showAlert = (text) => {
    setAlertSection((prev) => ({ ...prev, message: text, show: true }));
    setTimeout(() => {
      setAlertSection((prev) => ({ ...prev, message: '', show: false }));
    }, 3000);
  };

  const handleEdit = (note) => {
    setMode('edit');
    setCurrentNote(note);
    showAlert('edit');
  };
  const handleDelete = (id) => {
    setData((prevData) => {
      const newData = prevData.filter((note) => note.id !== id);
      if (filter.state)
        setFilter((prev) => ({ ...prev, data: getFiltredData(newData, filter.tags) }));
      return newData;
    });
    setCurrentNote('');
    showAlert('note deleted');
  };
  const handleUpdateNote = (newNote) => {
    setCurrentNote(newNote);
    setData((prevData) => {
      const newData = prevData.map((note) => (note.id === newNote.id ? newNote : note));
      if (filter.state) {
        setFilter((prev) => ({ ...prev, data: getFiltredData(newData, filter.tags) }));
      }
      return newData;
    });
    showAlert('note updated');
  };
  const handleOpen = (note) => {
    setMode('show');
    setCurrentNote(note);
  };
  const handleCreateNew = () => {
    setMode('edit');
    setCurrentNote('');
  };

  const handleSaveNewNote = (newNote) => {
    setData(() => [...data, newNote]);
    showAlert('saved');
  };

  return (
    <Container fluid="xl">
      <Row>
        <Col className="header-wrapper">
          <Header />
          {alertSection.show ? (
            <Alert className="alert-message" variant="info">
              {alertSection.message}
            </Alert>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <CurrentFilter
            filter={filter.tags}
            removeFilter={(tag) => removeFilter(filter.tags, setFilter, data, tag)}
          />
          {data.length ? (
            <Notes
              data={filter.state ? filter.data : data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleOpen={handleOpen}
            />
          ) : (
            <p>nothing to show</p>
          )}
        </Col>
        <Col md>
          <Row>
            <Forms
              mode={mode}
              content={currentNote}
              saveNote={handleSaveNewNote}
              updateNote={handleUpdateNote}
            />
          </Row>
          <Row>
            <Tags data={data} applyFilter={(tag) => applyFilter(setFilter, data, tag)} />
          </Row>
        </Col>
        <Col xs={1}>
          <ButtonGroup vertical>
            <Button variant="warning" onClick={handleCreateNew}>
              new
            </Button>
            <Button variant="warning" onClick={() => setData((prev) => [...prev, getMockData()])}>
              mock
            </Button>
            <Button variant="danger" onClick={() => setData(getTagsFromInitialText(storage))}>
              reset all
            </Button>
            <Button variant="danger" onClick={() => resetFilter(setFilter)}>
              reset filters
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
