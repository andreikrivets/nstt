import React from 'react';
import { Button } from 'react-bootstrap';

const Tag = ({ tagText }) => {
  return <Button variant="light">{tagText}</Button>;
};

export default Tag;
