import React from 'react';
import parse from 'html-react-parser';
import { Card } from 'react-bootstrap';

const ShowForm = ({ content }) => {
  const highlitedText = content.text
    ? content.text.replace(/\n$/g, '\n\n').replace(/#\w+/g, '<strong>$&</strong>')
    : 'nothing to show';
  const element = parse(highlitedText);
  return (
    <>
      <Card className="card-wrapper">
        <Card.Body>
          <Card.Title>{content.title}</Card.Title>
          <Card.Text>{element}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ShowForm;
