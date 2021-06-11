import React from 'react';
import uniqid from 'uniqid';

const CurrentFilter = ({ filter, removeFilter }) => {
  if (!filter) return null;
  return (
    <>
      {filter.map((tag) => (
        <button type="button" key={uniqid()} onClick={(e) => removeFilter(e.target.textContent)}>
          {tag}
        </button>
      ))}
    </>
  );
};

export default CurrentFilter;
