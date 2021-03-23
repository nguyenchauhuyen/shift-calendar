import { combineReducers } from 'redux';
import shift from './shiftReducer';

const appReducers = () =>
  combineReducers({
    shift
  });

export default appReducers;
