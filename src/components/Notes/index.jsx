import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List, AutoSizer } from 'react-virtualized/dist/commonjs/';

import { getInitialData } from '../../actions';
import Note from './Note';

const Notes = (props) => {
  const { data, filtredData, filtred, getData } = props;
  useEffect(() => {
    getData();
  }, []);
  if (!data || !data.length) return <span>no notes :(</span>;
  const content = filtred ? [...filtredData] : [...data];
  if (!content.length) return <div>no matching notes</div>;
  const lng = content.length;
  let rowHeight = 42;

  const renderRow = ({ index, key, style }) => {
    rowHeight = style.height;
    return <Note style={style} data={content[index]} key={key} />;
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

const mapStateToProps = (state) => {
  const { data, filtredData, filtred } = state.notes;
  return {
    data,
    filtredData,
    filtred,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getInitialData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
