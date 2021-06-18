import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import { hideAlert, onUpdateText, showAlert } from '../../actions';

const TextForm = (props) => {
  const { text: initialText, id, updateText, showMessage } = props;
  const backdropRef = useRef(null);
  const highlitedTextRef = useRef(null);
  const textAreaRef = useRef(null);

  const [text, setText] = useState('');
  const applyHighlights = (content) => (content ? content.replace(/#\w+/g, '<mark>$&</mark>') : '');

  useEffect(() => {
    if (initialText) {
      setText(initialText);
      highlitedTextRef.current.innerHTML = applyHighlights(initialText || '');
    }
  }, [initialText]);

  const handleScroll = () => {
    const { scrollTop } = textAreaRef.current;
    backdropRef.current.scrollTop = scrollTop;
    highlitedTextRef.current.scrollTop = scrollTop;
  };

  const handleUpdate = () => {
    const tags = text ? Array.from(new Set(text.match(/#\w+/g))) : [];
    if (text !== initialText && id) {
      updateText({ id, text, tags });
      showMessage('text updated');
    }
  };

  const handleTextChange = (e) => {
    setText(() => e.target.value);
    highlitedTextRef.current.innerHTML = applyHighlights(text);
  };

  return (
    <>
      <div ref={backdropRef} className="backdrop">
        <div ref={highlitedTextRef} className="highlights" />
      </div>
      <textarea
        ref={textAreaRef}
        onScroll={handleScroll}
        onChange={handleTextChange}
        onBlur={handleUpdate}
        required
        value={text || ''}
        placeholder="text"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { text, id } = state.notes.current;
  return {
    text,
    id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateText: (params) => dispatch(onUpdateText(params)),
    showMessage: (message) => {
      dispatch(showAlert(message));
      setTimeout(() => dispatch(hideAlert()), 2000);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextForm);
