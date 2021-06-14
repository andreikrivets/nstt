import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { onCreateFilter } from '../../actions';

const Tag = (props) => {
  const { tagText, applyFilter } = props;
  return (
    <Button variant="light" onClick={() => applyFilter(tagText)}>
      {tagText}
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyFilter: (tag) => dispatch(onCreateFilter(tag)),
  };
};

export default connect(null, mapDispatchToProps)(Tag);
