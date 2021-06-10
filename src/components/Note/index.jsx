import React from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';

const Note = ({ data, handleEdit, handleDelete }) => {
  return (
    <Card style={{ width: '10rem', overflowY: 'visible' }} className="text-center">
      <Card.Header>
        {data.title.length > 10 ? `${data.title.slice(0, 10)}...` : data.title}
      </Card.Header>
      <Card.Body>
        <Card.Text>{data.text.length > 20 ? `${data.text.slice(0, 20)}...` : data.text}</Card.Text>
        <ButtonGroup>
          <Button variant="primary" onClick={() => handleEdit(data)}>
            edit
          </Button>
          <Button variant="secondary" onClick={() => handleDelete(data.id)}>
            delete
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default Note;
