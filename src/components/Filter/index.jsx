import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import { onRemoveFilter } from '../../actions';

const CurrentFilter = ({ filter, removeFilter }) => {
  if (!filter) return null;
  return (
    <>
      {filter.length
        ? filter.map((tag) => (
            <button
              type="button"
              key={uniqid()}
              onClick={(e) => removeFilter(e.target.textContent)}
            >
              {tag}
            </button>
          ))
        : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { filter } = state.notes;
  return { filter };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFilter: (tag) => dispatch(onRemoveFilter(tag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentFilter);
