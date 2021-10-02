import { GET_DATE_LIST, SET_DATE } from '../constants';

// Redux actions for date

export const getDateList = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: GET_DATE_LIST,
      data: [],
    });
  }, 2000);
};

export const setDate = (dateData) => (dispatch) => {
  dispatch({
    type: SET_DATE,
    data: dateData,
  });
};
