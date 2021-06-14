import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { onEdit, onOpen, onDelete } from '../../actions';

const Note = (props) => {
  const { data, onEdit: handleEdit, onDelete: handleDelete, onOpen: handleOpen, style } = props;
  if (!data) return null;
  return (
    <ListGroup style={style} horizontal>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onOpen: (current) => dispatch(onOpen(current)),
    onEdit: (current) => dispatch(onEdit(current)),
    onDelete: (id) => dispatch(onDelete(id)),
  };
};

export default connect(null, mapDispatchToProps)(Note);
