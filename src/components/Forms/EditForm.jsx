import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { Button, Form, Card } from 'react-bootstrap';

import { onSave, onUpdate } from '../../actions/index';

const EditForm = (props) => {
  const { content, saveNote, updateNote } = props;
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
    highlitedText.current.innerHTML = '';
    e.preventDefault();
  };

  const handleTitleChange = (event) => setNoteData({ ...noteData, title: event.target.value });
  const handleTextChange = (event) => {
    const { value } = event.target;
    highlitedText.current.innerHTML = applyHighlights(value);
    setNoteData({ ...noteData, text: value });
  };

  return (
    <Card className="card-wrapper">
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
            placeholder="text"
          />
          <Button type="submit" variant="primary">
            save
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNote: (newNote) => dispatch(onSave(newNote)),
    updateNote: (newNote) => dispatch(onUpdate(newNote)),
  };
};

export default connect(null, mapDispatchToProps)(EditForm);
