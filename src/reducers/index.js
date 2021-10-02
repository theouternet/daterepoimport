import { combineReducers } from 'redux';
import dateReducer from './date-reducer';

export default combineReducers({
  dates: dateReducer,
});
