import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { onOpen, onDelete, showAlert, hideAlert } from '../../actions';

const Note = (props) => {
  const { data, deleteNote, openNote, style, showMessage } = props;

  const handleOpen = () => openNote(data);

  const handleDelete = () => {
    deleteNote(data.id);
    showMessage('deleted');
  };

  if (!data) return null;
  return (
    <ListGroup style={style} horizontal>
      <ListGroup.Item action onClick={() => handleOpen(data)}>
        {data.title.length > 15 ? `${data.title.slice(0, 15)}...` : data.title}
      </ListGroup.Item>
      <ListGroup.Item as="button" onClick={handleDelete}>
        🗑️
      </ListGroup.Item>
    </ListGroup>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNote: (current) => dispatch(onOpen(current)),
    deleteNote: (id) => dispatch(onDelete(id)),
    showMessage: (message) => {
      dispatch(showAlert(message));
      setTimeout(() => dispatch(hideAlert()), 2000);
    },
  };
};

export default connect(null, mapDispatchToProps)(Note);
