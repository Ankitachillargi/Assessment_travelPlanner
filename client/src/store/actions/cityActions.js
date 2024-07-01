import { GET_TRIPS, REQUEST_TRIPS, SUCCESS_TRIP_DETAILS, WILL_TRIP_DETAILS, AUTH_USER, FAIL_TRIP_DETAILS  } from './types';
import axios from 'axios';
import { returnErrors } from '../actions/errActions';

export const getTripDetails = () => (dispatch) => {
  dispatch({ type: REQUEST_TRIPS });
  axios
    .get('/addTrips/all')
    .then((res) => dispatch({ type: GET_TRIPS, payload: res.data }))
    .catch((err) => console.log(err));
};



// =========================================
// -------------- Add Trip Detail -----------------
// =========================================
export const addTripDetails = ({
  firstName,
  lastName,
  country,
  startDate,
  endDate,
  modeOfTrip
}) => async (dispatch) => {
  //this would be needed to send pictures to the server:
  // const config = {
  //   headers: {
  //     'content-type': 'multipart/form-data'
  //   }
  //}

  //prepate body and headers of POST request
  const body = {
    firstName,
  lastName,
  country,
  startDate,
  endDate,
  modeOfTrip
  };

  try {
    dispatch({ type: WILL_TRIP_DETAILS });
    const res = await axios.post('/addTrips/save', body);
    dispatch({
      type: SUCCESS_TRIP_DETAILS,
      payload: res.data, //this is the token we are sending back with JWT
    });
    dispatch(authUser());
  } catch (err) {
    console.log(err);
    const errorMsg = err.response.data.errors[0].msg;
    const errorStat = err.response.status;
    dispatch(returnErrors(errorMsg, errorStat));
    dispatch({
      type: FAIL_TRIP_DETAILS,
    });
  }
};

// =========================================
// -------------- AUTH USER  ---------------
// =========================================
export const authUser = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json', //not sure this is necessary for json
      Authorization: 'Bearer ' + localStorage.getItem('token'), // if there isnt a token then it will read 'Bearer undefined'
    },
  };
  try {
    const res = await axios.get('/users/auth/', config);
    dispatch({
      type: AUTH_USER,
      payload: res.data, //this is the user that passport.js sends back, which will go into state.user.user (i think)
    });
  } catch (err) {
    console.log(err);
  }
};