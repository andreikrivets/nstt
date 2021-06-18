import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { onUpdateTitle, showAlert, hideAlert } from '../../actions';

const TitleForm = (props) => {
  const { title: initialTitle, id, updateTitle } = props;
  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => {
    setTitle(() => e.target.value);
  };

  useEffect(() => {
    if (initialTitle) {
      setTitle(() => initialTitle);
    }
  }, [initialTitle]);

  const handleUpdate = () => {
    if (title && title !== initialTitle && id) {
      updateTitle(title, id);
      showAlert('title updated');
    }
  };

  return (
    <>
      <Form.Control
        onChange={handleTitleChange}
        value={title || ''}
        onBlur={handleUpdate}
        size="md"
        placeholder="title"
        required
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { title, id } = state.notes.current;
  return {
    title,
    id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTitle: (newTitle, id) => dispatch(onUpdateTitle(newTitle, id)),
    showMessage: (message) => {
      dispatch(showAlert(message));
      setTimeout(() => dispatch(hideAlert()), 2000);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleForm);
