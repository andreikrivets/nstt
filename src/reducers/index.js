import {
  FETCH_INITIAL,
  EDIT_NOTE,
  OPEN_NOTE,
  UPDATE_NOTE,
  SAVE_NOTE,
  DELETE_NOTE,
  CREATE_NOTE,
  CREATE_MOCK,
  CREATE_FILTER,
  RESET_FILTER,
  REMOVE_FILTER,
} from '../actions/types';
import getFiltredData from '../utils/getFiltredData';

const defaultNotesState = {
  data: [],
  filtredData: [],
  current: {},
  mode: '',
  filred: false,
  filter: [],
};

const notes = (state = defaultNotesState, action) => {
  const mainData = state.data;
  switch (action.type) {
    case FETCH_INITIAL:
      return { ...state, data: action.data };

    case OPEN_NOTE:
      return { ...state, current: action.payload, mode: 'show' };

    case EDIT_NOTE:
      return { ...state, current: action.payload, mode: 'edit' };

    case UPDATE_NOTE: {
      const newNote = action.payload;
      const currentData = [...mainData];
      return {
        ...state,
        data: currentData.map((note) => (note.id === newNote.id ? newNote : note)),
        filtredData: state.filtredData.map((note) => (note.id === newNote.id ? newNote : note)),
        current: newNote,
      };
    }

    case DELETE_NOTE: {
      const currentData = state.filtred ? [...state.filtredData] : [...state.data];
      return {
        ...state,
        data: currentData.filter((note) => note.id !== action.payload),
      };
    }

    case SAVE_NOTE:
      return { ...state, data: [...state.data, action.payload] };

    case CREATE_NOTE:
      return { ...state, mode: 'edit' };

    case CREATE_MOCK:
      return { ...state, data: [...state.data, action.payload] };

    case CREATE_FILTER: {
      const uniqueFilter = Array.from(new Set([...state.filter, action.payload]));
      const currentData = state.filtred ? [...state.filtredData] : [...state.data];
      const filtredData = getFiltredData(currentData, uniqueFilter);
      return { ...state, filtred: true, filtredData, filter: uniqueFilter };
    }

    case REMOVE_FILTER: {
      const newFilter = state.filter.filter((tag) => tag !== action.payload);
      if (!newFilter.length)
        return { ...state, filtred: false, data: mainData, filter: [], mode: 'show', current: {} };
      const uniqueFilter = Array.from(new Set([...newFilter]));
      const filtredData = getFiltredData(state.data, uniqueFilter);
      return { ...state, filtred: true, filtredData, filter: uniqueFilter };
    }

    case RESET_FILTER: {
      return { ...state, filtred: false, filter: [] };
    }

    default:
      return state;
  }
};

export default { notes };
