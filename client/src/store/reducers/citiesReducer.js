import { GET_TRIPS } from '../actions/types';
import { REQUEST_TRIPS } from '../actions/types';

const initState = {
  isFetching: false,
  cities: []
};

const citiesReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_TRIPS:
      return { ...state, isFetching: true };
    case GET_TRIPS:
      return { ...state, cities: action.payload, isFetching: false };
    default:
      return state;
  }
};

export default citiesReducer;
