import React from 'react';
import { Button } from 'react-bootstrap';

const Tag = ({ tagText, applyFilter }) => {
  return (
    <Button variant="light" onClick={() => applyFilter(tagText)}>
      {tagText}
    </Button>
  );
};

export default Tag;
