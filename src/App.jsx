import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import './App.scss';
import Forms from './components/Forms';
import Header from './components/Header';
import Note from './components/Note';

import storage from './data/storage.json';

const App = () => {
  const [data, setData] = useState([]);
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    setData(storage);
  }, []);

  const handleEdit = (note) => setCurrentNote(note);
  const handleDelete = (id) => setData((prev) => prev.filter((note) => note.id !== id));
  const handleSaveNote = (newNote) => setData(() => [...data, newNote]);
  const handleUpdateNote = (newNote) =>
    setData((prev) => prev.map((note) => (note.id === newNote.id ? newNote : note)));

  if (!data.length)
    return (
      <Container className="container">
        <Spinner animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
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
    </Container>
  );
};

export default App;
