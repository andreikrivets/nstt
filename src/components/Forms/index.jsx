import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { Button } from 'react-bootstrap';

import { onSave } from '../../actions/index';
import TitleForm from './TitleForm';
import TextForm from './TextForm';

const Forms = (props) => {
  const { createNote, id } = props;

  const handleSubmit = (e) => {
    const title = e.target[0].value;
    const text = e.target[1].value;
    const tags = Array.from(new Set(text.match(/#\w+/g))) || [];
    if (!id) createNote({ id: uniqid(), title, text, tags });
    e.preventDefault();
  };

  return (
    <div className="card-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <TitleForm />
          <TextForm />
          {!id ? (
            <Button type="submit" variant="primary">
              create
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { id } = state.notes.current;
  return { id };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (newNote) => dispatch(onSave(newNote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
