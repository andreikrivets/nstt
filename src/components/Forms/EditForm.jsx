import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

const EditForm = ({ content, saveNote, updateNote }) => {
  const [noteData, setNoteData] = useState({});

  useEffect(() => {
    setNoteData(content);
  }, [content]);

  const handleSubmit = (e) => {
    const title = e.target[0].value;
    const text = e.target[1].value;
    const tags = Array.from(new Set(text.match(/#\w+/g))) || [];

    if (!noteData.id) saveNote({ id: uniqid(), title, text, tags });
    else {
      updateNote({
        id: noteData.id,
        title,
        text,
        tags,
      });
    }
    setNoteData({});
    e.preventDefault();
  };

  const handleTitleChange = (event) => setNoteData({ ...noteData, title: event.target.value });
  const handleTextChange = (event) => setNoteData({ ...noteData, text: event.target.value });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          onChange={handleTitleChange}
          value={noteData.title || ''}
          size="md"
          placeholder="title"
          required
        />
        <Form.Control
          as="textarea"
          onChange={handleTextChange}
          value={noteData.text || ''}
          size="md"
          placeholder="text"
          required
        />
        <ButtonGroup>
          <Button type="submit" variant="primary">
            save
          </Button>
        </ButtonGroup>
      </Form.Group>
    </Form>
  );
};

export default EditForm;
