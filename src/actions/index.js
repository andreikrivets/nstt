import * as types from './types';

import initialData from '../data/storage.json';
import getTagsFromInitialText from '../utils/getTagsFromText';
import getMockData from '../utils/getMockData';

export const getInitialData = () => ({
  type: types.FETCH_INITIAL,
  data: getTagsFromInitialText(initialData),
});

export const onOpen = (current) => ({
  type: types.OPEN_NOTE,
  payload: current,
});

export const onDelete = (id) => ({
  type: types.DELETE_NOTE,
  payload: id,
});

export const onSave = (newNote) => ({
  type: types.SAVE_NOTE,
  payload: newNote,
});

export const onUpdateTitle = (newTitle, id) => ({
  type: types.UPDATE_TITLE,
  payload: [newTitle, id],
});

export const onUpdateText = (params) => ({
  type: types.UPDATE_TEXT,
  payload: params,
});

export const onCreate = () => ({
  type: types.CREATE_NOTE,
});

export const onCreateMock = () => ({
  type: types.CREATE_MOCK,
  payload: getMockData(),
});

export const onCreateFilter = (tag) => ({
  type: types.CREATE_FILTER,
  payload: tag,
});

export const onRemoveFilter = (tag) => ({
  type: types.REMOVE_FILTER,
  payload: tag,
});

export const onResetFilter = () => ({
  type: types.RESET_FILTER,
});

export const showAlert = (message) => ({
  type: types.SHOW_ALERT,
  payload: message,
});

export const hideAlert = () => ({
  type: types.HIDE_ALERT,
});
