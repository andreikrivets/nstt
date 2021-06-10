import React from 'react';
// import { ListGroup } from 'react-bootstrap';
import uniqid from 'uniqid';

import Note from './Note';

const Notes = ({ data, handleEdit, handleDelete, handleOpen }) => (
  <div>
    {data.map((noteData) => (
      <Note
        key={uniqid()}
        data={noteData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleOpen={handleOpen}
      />
    ))}
  </div>
);

export default Notes;
