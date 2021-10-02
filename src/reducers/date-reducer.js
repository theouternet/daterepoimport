import { GET_DATE_LIST, SET_DATE } from '../constants';

// Redux reducers for date

const initialState = {
  list: [],
};

export default function cardItems(state = initialState, action) {
  switch (action.type) {
    case GET_DATE_LIST:
      return {
        ...state,
        list: action.data,
      };

    case SET_DATE:
      return {
        ...state,
        list: [...state.list, action.data],
      };

    default:
      return state;
  }
}
