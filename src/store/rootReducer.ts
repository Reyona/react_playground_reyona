import { combineReducers } from 'redux';
import employee from './employee';
import order from './order';

const reducers = { employee, order };

export default combineReducers(reducers);
