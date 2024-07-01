import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
import itinerariesReducer from './itinerariesReducer';
import actReducer from './actReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import errReducer from './errReducer';
import tripReducer from './tripReducer';

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: actReducer,
  users: userReducer,
  comments: commentReducer,
  errors: errReducer,
  tripDetails: tripReducer

});
export default rootReducer;
