import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { Container, Row, Col } from 'react-bootstrap';

import './App.scss';
import Forms from './components/Forms';
import Header from './components/Header';
import Note from './components/Note';
import Tags from './components/Tags';

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

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        {data.length ? (
          data.map((noteData) => (
            <Note
              key={uniqid()}
              data={noteData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>Nothing to show</p>
        )}
      </Row>
      <Row>
        <Col>
          <Forms content={currentNote} saveNote={handleSaveNote} updateNote={handleUpdateNote} />
        </Col>
      </Row>
      <Row>
        <Tags data={data} />
      </Row>
    </Container>
  );
};

export default App;
