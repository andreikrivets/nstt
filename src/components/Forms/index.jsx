import React from 'react';
import { connect } from 'react-redux';

import EditForm from './EditForm';
import ShowForm from './ShowForm';

const Forms = (props) => {
  const { mode, current } = props;
  if (mode === 'edit') return <EditForm content={current} />;
  return <ShowForm content={current} />;
};

const mapStateToProps = (state) => {
  const { mode, current } = state.notes;
  return {
    mode,
    current,
  };
};

export default connect(mapStateToProps, null)(Forms);
