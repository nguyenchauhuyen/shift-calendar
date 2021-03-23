import * as Types from '../constants/ActionTypes';

export const initialState = {
  list: [],
  itemEditing: {}
};

const shiftReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.FETCH_SHIFTS: {
      return { ...state, list: action.payload };
    }
    case Types.DELETE_SHIFT: {
      return { ...state, list: state.list.filter(el => el.id !== action.payload.id)};
    }
    case Types.UPDATE_SHIFT: {
      let list = [...state.list];
      const index = state.list.findIndex(el => el.id === action.payload.id);
      list[index] = { ...action.payload };
      return { ...state, list };
    }
    case Types.ADD_SHIFT: {
      let list = [...state.list];
      list.push(action.payload);
      return { ...state, list };
    }
    case Types.FETCH_SHIFT_DETAIL: {
      return { ...state, itemEditing: action.payload}
    }
    default:
      return state;
  }
};

export default shiftReducer;
