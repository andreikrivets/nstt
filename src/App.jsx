import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './App.scss';
import Forms from './components/Forms';
import Header from './components/Header';
import Tags from './components/Tags';
import Notes from './components/Notes';

import storage from './data/storage.json';
import getTagsFromInitialText from './utils/getTagsFromInitialText';

const App = () => {
  const [data, setData] = useState([]);
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    setData(getTagsFromInitialText(storage));
  }, []);

  const handleEdit = (note) => setCurrentNote(note);
  const handleDelete = (id) => setData((prev) => prev.filter((note) => note.id !== id));
  const handleSaveNote = (newNote) => setData(() => [...data, newNote]);
  const handleUpdateNote = (newNote) =>
    setData((prev) => prev.map((note) => (note.id === newNote.id ? newNote : note)));
  const handleOpen = (id) => console.log(id);

  return (
    <Container fluid="xl">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          {data.length ? (
            <Notes
              data={data}
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
            <Forms content={currentNote} saveNote={handleSaveNote} updateNote={handleUpdateNote} />
          </Row>
          <Row>
            <Tags data={data} />
          </Row>
          <Row xs={5}>
            <Button variant="danger" onClick={() => setData(getTagsFromInitialText(storage))}>
              reset
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
