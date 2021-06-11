import React from 'react';
import { Card } from 'react-bootstrap';

const ShowForm = ({ content }) => {
  return (
    <>
      <Card>
        <Card.Title>{content.title}</Card.Title>
        <Card.Body>{content.text}</Card.Body>
      </Card>
    </>
  );
};

export default ShowForm;
