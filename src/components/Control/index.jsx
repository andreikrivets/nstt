import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';

import { onCreate, onCreateMock, onResetFilter } from '../../actions/index';

const ControlGroup = (props) => {
  const { createNew, resetFilter, createMock } = props;
  return (
    <ButtonGroup vertical>
      <Button variant="warning" onClick={createNew}>
        new
      </Button>
      <Button variant="warning" onClick={createMock}>
        mock
      </Button>
      <Button variant="danger" onClick={resetFilter}>
        reset filters
      </Button>
    </ButtonGroup>
  );
};

const mapsDispatchToProps = (dispatch) => {
  return {
    createNew: () => dispatch(onCreate()),
    createMock: () => dispatch(onCreateMock()),
    resetFilter: () => dispatch(onResetFilter()),
  };
};

export default connect(null, mapsDispatchToProps)(ControlGroup);
