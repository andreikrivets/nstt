import * as types from '../actions/types';
import getFiltredData from '../utils/getFiltredData';

const defaultNotesState = {
  data: [],
  filtredData: [],
  current: {},
  filred: false,
  filter: [],
  alert: '',
};

const notes = (state = defaultNotesState, action) => {
  const mainData = state.data;
  switch (action.type) {
    case types.FETCH_INITIAL:
      return { ...state, data: action.data };

    case types.OPEN_NOTE:
      return { ...state, current: action.payload };

    case types.UPDATE_TEXT: {
      const { id, text: newText, tags } = action.payload;
      return {
        ...state,
        current: {
          ...state.current,
          text: newText,
          tags,
        },
        data: mainData.map((note) => ({
          ...note,
          text: note.id === id ? newText : note.text,
          tags: note.id === id ? tags : note.tags,
        })),
        filtredData: state.filtredData.map((note) => ({
          ...note,
          text: note.id === id ? newText : note.text,
          tags: note.id === id ? tags : note.tags,
        })),
      };
    }

    case types.UPDATE_TITLE: {
      const [newTitle, id] = action.payload;
      return {
        ...state,
        current: {
          ...state.current,
          title: newTitle,
        },
        data: mainData.map((note) => ({
          ...note,
          title: note.id === id ? newTitle : note.title,
        })),
        filtredData: state.filtredData.map((note) => ({
          ...note,
          title: note.id === id ? newTitle : note.title,
        })),
      };
    }

    case types.DELETE_NOTE: {
      const currentData = state.filtred ? [...state.filtredData] : [...state.data];
      return {
        ...state,
        data: currentData.filter((note) => note.id !== action.payload),
      };
    }

    case types.SAVE_NOTE:
      return { ...state, data: [...state.data, action.payload] };

    case types.CREATE_NOTE:
      return { ...state, current: { title: 'title', text: 'text' } };

    case types.CREATE_MOCK:
      return { ...state, data: [...state.data, action.payload] };

    case types.CREATE_FILTER: {
      const uniqueFilter = Array.from(new Set([...state.filter, action.payload]));
      const currentData = state.filtred ? [...state.filtredData] : [...state.data];
      const filtredData = getFiltredData(currentData, uniqueFilter);
      return { ...state, filtred: true, filtredData, filter: uniqueFilter };
    }

    case types.REMOVE_FILTER: {
      const newFilter = state.filter.filter((tag) => tag !== action.payload);
      if (!newFilter.length)
        return { ...state, filtred: false, data: mainData, filter: [], current: {} };
      const uniqueFilter = Array.from(new Set([...newFilter]));
      const filtredData = getFiltredData(state.data, uniqueFilter);
      return { ...state, filtred: true, filtredData, filter: uniqueFilter };
    }

    case types.RESET_FILTER: {
      return { ...state, filtred: false, filter: [], current: {} };
    }

    default:
      return state;
  }
};

export default notes;
