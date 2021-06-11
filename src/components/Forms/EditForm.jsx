/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import uniqid from 'uniqid';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

const EditForm = ({ content, saveNote, updateNote }) => {
  const [noteData, setNoteData] = useState({});
  const highlitedText = useRef(null);
  const textArea = useRef(null);
  const backDrop = useRef(null);

  const applyHighlights = (text) =>
    text.replace(/\n$/g, '\n\n').replace(/#\w+/g, '<mark>$&</mark>');

  useEffect(() => {
    setNoteData(content);
    highlitedText.current.innerHTML = applyHighlights(content.text || '');
  }, [content]);

  const handleScroll = () => {
    const { scrollTop } = textArea.current;
    backDrop.current.scrollTop = scrollTop;
    highlitedText.current.scrollTop = scrollTop;
  };

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
  const handleTextChange = (event) => {
    const { value } = event.target;
    highlitedText.current.innerHTML = applyHighlights(value);
    setNoteData({ ...noteData, text: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as="div" className="wrapper">
        <Form.Control
          onChange={handleTitleChange}
          value={noteData.title || ''}
          size="md"
          placeholder="title"
          required
        />
        <div ref={backDrop} className="backdrop">
          <div ref={highlitedText} className="highlights" />
        </div>
        <textarea
          ref={textArea}
          onScroll={handleScroll}
          onChange={handleTextChange}
          required
          value={noteData.text || ''}
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
