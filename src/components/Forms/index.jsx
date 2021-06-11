import React from 'react';

import EditForm from './EditForm';
import ShowForm from './ShowForm';

const Forms = ({ mode, content, saveNote, updateNote }) => {
  if (mode === 'edit')
    return <EditForm content={content} saveNote={saveNote} updateNote={updateNote} />;
  return <ShowForm content={content} />;
};

export default Forms;
