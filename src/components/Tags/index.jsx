import React from 'react';
import uniqid from 'uniqid';

import Tag from './Tag';

const Tags = ({ data, applyFilter }) => {
  if (!data && !data.length) return <span> No tags </span>;
  const uniqueTags = Array.from(new Set(data.map((note) => note.tags).flat()));
  return (
    <div className="tags-wrapper">
      {uniqueTags.map((tag) => (
        <Tag tagText={tag} key={uniqid()} applyFilter={applyFilter} />
      ))}
    </div>
  );
};

export default Tags;
