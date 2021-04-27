import {combineReducers} from 'redux';

import {SET_FILTER, SET_MOVIES, SET_USER, DEL_USER, ADD_FAVORITE, DEL_FAVORITE, UPDATE_USER, LOGOUT_USER, LOGIN_USER} from '../actions/actions';

// we need to apply an initial state for when the reducer is called for the first time. Afterwards, the reducer will use previousState. 
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER: 
      return action.value;
    default: 
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value; // when reducer receives the SET_MOVIES action, SET_MOVIES' value is returned. 
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    case UPDATE_USER:
      return action.value;
    case DEL_USER:
      return action.value; // is this the correct place for this action call, or should I put it in a separate reducer?
    case ADD_FAVORITE:
      return action.value;
    case DEL_FAVORITE:
        return action.value;
    default:
      return state;
  }
}

// combined reducer: elegantly groups together reducers and pass them to the state they are concerned with. 
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

// presents entire movie app 
export default moviesApp;