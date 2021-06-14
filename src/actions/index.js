import {
  CREATE_MOCK,
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_INITIAL,
  OPEN_NOTE,
  RESET_FILTER,
  SAVE_NOTE,
  UPDATE_NOTE,
  CREATE_FILTER,
  REMOVE_FILTER,
} from './types';

import initialData from '../data/storage.json';
import getTagsFromInitialText from '../utils/getTagsFromText';
import getMockData from '../utils/getMockData';

export const getInitialData = {
  type: FETCH_INITIAL,
  data: getTagsFromInitialText(initialData),
};

export const onEdit = (current) => ({
  type: EDIT_NOTE,
  payload: current,
});

export const onOpen = (current) => ({
  type: OPEN_NOTE,
  payload: current,
});

export const onDelete = (id) => ({
  type: DELETE_NOTE,
  payload: id,
});

export const onSave = (newNote) => ({
  type: SAVE_NOTE,
  payload: newNote,
});

export const onUpdate = (newNote) => ({
  type: UPDATE_NOTE,
  payload: newNote,
});

export const onCreate = () => ({
  type: CREATE_NOTE,
});

export const onCreateMock = () => ({
  type: CREATE_MOCK,
  payload: getMockData(),
});

export const onCreateFilter = (tag) => ({
  type: CREATE_FILTER,
  payload: tag,
});

export const onRemoveFilter = (tag) => ({
  type: REMOVE_FILTER,
  payload: tag,
});

export const onResetFilter = () => ({
  type: RESET_FILTER,
});
