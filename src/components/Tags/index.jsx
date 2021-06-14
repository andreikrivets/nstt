import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import Tag from './Tag';

const Tags = (props) => {
  const { data } = props;
  if (!data || !data.length) return <span> no tags </span>;
  const uniqueTags = Array.from(new Set(data.map((note) => note.tags).flat()));
  return (
    <div className="tags-wrapper">
      {uniqueTags.map((tag) => (
        <Tag tagText={tag} key={uniqid()} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data, filtredData, filtred } = state.notes;
  return {
    data,
    filtredData,
    filtred,
  };
};

export default connect(mapStateToProps, null)(Tags);
