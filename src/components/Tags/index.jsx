import React from 'react';
import uniqid from 'uniqid';

import Tag from './Tag';

const Tags = ({ data }) => {
  if (!data && !data.length) return <span> No tags </span>;
  return (
    <div>{data.map((note) => note.tags.map((tag) => <Tag tagText={tag} key={uniqid()} />))}</div>
  );
};

export default Tags;
