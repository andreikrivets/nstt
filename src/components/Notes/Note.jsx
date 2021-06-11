import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Note = ({ data, handleEdit, handleDelete, handleOpen }) => {
  return (
    <ListGroup horizontal>
      <ListGroup.Item action onClick={() => handleOpen(data)}>
        {data.title.length > 15 ? `${data.title.slice(0, 15)}...` : data.title}
      </ListGroup.Item>
      <ListGroup.Item as="button" onClick={() => handleEdit(data)}>
        🖊️
      </ListGroup.Item>
      <ListGroup.Item as="button" onClick={() => handleDelete(data.id)}>
        🗑️
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Note;
