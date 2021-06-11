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
import getMockData from './utils/getMockData';

const App = () => {
  const [data, setData] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [mode, setMode] = useState('edit');

  const initialFilter = { data: {}, state: false, tags: [] };
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    setData(getTagsFromInitialText(storage));
  }, []);

  const handleEdit = (note) => {
    setMode('edit');
    setCurrentNote(note);
  };
  const handleDelete = (id) => {
    setData((prevData) => {
      const newData = prevData.filter((note) => note.id !== id);
      if (filter.state)
        setFilter((prev) => ({ ...prev, data: getFiltredData(newData, filter.tags) }));
      return newData;
    });
    setCurrentNote('');
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
    setFilter((prev) => {
      const uniqueFilter = Array.from(new Set([...prev.tags, tag]));
      return { ...prev, state: true, data: getFiltredData(data, uniqueFilter), tags: uniqueFilter };
    });
  };

  const resetFilters = () => {
    setFilter(initialFilter);
  };

  const handleRemoveFilter = (filterName) => {
    const newFilters = filter.tags.filter((tag) => tag !== filterName);
    if (newFilters.length) {
      setFilter((prev) => ({
        ...prev,
        state: true,
        tags: newFilters,
        data: getFiltredData(data, newFilters),
      }));
    } else resetFilters();
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
          <CurrentFilter filter={filter.tags} removeFilter={handleRemoveFilter} />
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
            <Button variant="warning" onClick={() => setData((prev) => [...prev, getMockData()])}>
              mock
            </Button>
            <Button variant="danger" onClick={() => setData(getTagsFromInitialText(storage))}>
              reset all
            </Button>
            <Button variant="danger" onClick={() => resetFilters()}>
              reset filters
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
