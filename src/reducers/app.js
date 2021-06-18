import * as types from '../actions/types';

const defaultAppState = {
  alert: '',
};

const app = (state = defaultAppState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT: {
      return {
        ...state,
        alert: action.payload,
      };
    }

    case types.HIDE_ALERT: {
      return {
        ...state,
        alert: '',
      };
    }

    default:
      return state;
  }
};

export default app;
