import React from 'react';
import { List, AutoSizer } from 'react-virtualized/dist/commonjs/';

import Note from './Note';

const Notes = ({ data, handleEdit, handleDelete, handleOpen }) => {
  if (!data) return null;
  const content = [...data];
  if (!content) return null;

  const lng = content.length;
  let rowHeight = 42;

  const renderRow = ({ index, key, style }) => {
    rowHeight = style.height;
    return (
      <Note
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleOpen={handleOpen}
        style={style}
        data={data[index]}
        key={key}
      />
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          className="notes-list"
          height={height}
          rowCount={lng}
          rowHeight={rowHeight}
          rowRenderer={renderRow}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

export default Notes;
