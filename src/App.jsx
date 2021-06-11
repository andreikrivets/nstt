import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './App.scss';
import Forms from './components/Forms';
import Header from './components/Header';
import Tags from './components/Tags';
import Notes from './components/Notes';
import CurrentFilter from './components/Filter';

import storage from './data/storage.json';
import getTagsFromInitialText from './utils/getTagsFromInitialText';
import getFiltredData from './utils/getFiltredData';

const App = () => {
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [mode, setMode] = useState('edit');
  // eslint-disable-next-line no-unused-vars
  const [isFiltred, setIsfiltred] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setData(getTagsFromInitialText(storage));
  }, []);

  const handleEdit = (note) => {
    setMode('edit');
    setCurrentNote(note);
  };
  const handleDelete = (id) => {
    setData((prev) => prev.filter((note) => note.id !== id));
    setCurrentNote('');
  };
  const handleUpdateNote = (newNote) => {
    setCurrentNote(newNote);
    setData((prev) => {
      const newData = prev.map((note) => (note.id === newNote.id ? newNote : note));
      if (isFiltred) {
        setFiltredData(() => getFiltredData(newData, filter));
      }
      return newData;
    });
  };
  const handleOpen = (note) => {
    setMode('show');
    setCurrentNote(note);
  };
  const handleCreateNew = () => {
    setMode('edit');
    setCurrentNote('');
  };

  const handleApplyFilter = (tag) => {
    setIsfiltred(true);
    setFilter((prev) => {
      const uniqueFilter = Array.from(new Set([...prev, tag]));
      setFiltredData(() => getFiltredData(data, uniqueFilter));
      return uniqueFilter;
    });
  };

  const handleRemoveFilter = (filterName) => {
    const newFilters = filter.filter((tag) => tag !== filterName);
    if (newFilters.length) {
      setIsfiltred(true);
      setFilter(newFilters);
      setFiltredData(() => getFiltredData(data, newFilters));
    } else {
      setFilter([]);
      setIsfiltred(false);
      setFiltredData(() => []);
    }
  };

  return (
    <Container fluid="xl">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <CurrentFilter filter={filter} removeFilter={handleRemoveFilter} />
          {data.length ? (
            <Notes
              data={isFiltred ? filtredData : data}
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
              saveNote={(newNote) => setData(() => [...data, newNote])}
              updateNote={handleUpdateNote}
            />
          </Row>
          <Row>
            <Tags data={data} applyFilter={handleApplyFilter} />
          </Row>
          <Row xs={6}>
            <Button variant="warning" onClick={handleCreateNew}>
              new
            </Button>
            <Button variant="danger" onClick={() => setData(getTagsFromInitialText(storage))}>
              reset all
            </Button>
            <Button variant="danger" onClick={() => setFilter('')}>
              reset filters
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
