import {combineReducers} from 'redux';

import {SET_FILTER, SET_MOVIES, SET_USER, LOGOUT_USER, LOGIN_USER} from '../actions/actions';

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

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

// Note: figure out the logic for handling logging in and out. 
function account(state= '', action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.value;
    case LOGOUT_USER:
      return action.value;
    default: 
      return state;
  }
}

// combined reducer: is a helper function that creates an object with different reducer functions a its values. This single function can then be passed to createStore(), calling every child reducer and gathering their results into a single state object. The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers().
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

// presents entire movie app 
export default moviesApp;