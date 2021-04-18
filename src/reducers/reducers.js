import {combineReducers} from 'redux';

import {SET_FILTER, SET_MOVIES, DEL_USER} from '../actions/actions';

// Reducers
// Each reducer takes a state + 1 action 
// If action falls within reducers realm of concern -> state is changed

// John: why use default state in reducer ""?
// state set to empty string bc it will be either true or false. 
function visibilityFilter(state = '', action) { // first line: reducer signature. State set to default ('') so reducer won't return what unconcerned actions pass into the function instead of state. 
  switch (action.type) {
    case SET_FILTER: // if action concerns reducer, call reducer and change state
      return action.value;
    default: // if action doesn't concern reducer, return given state. 
      return state;
  }
}

// info: this reducer is general and deals with movies (deleting, adding etc.). Hence why the name is more general than the ones for the action creators
// state initialized as empty array bc it needs to contain movie objects when they come in. 
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value; // when reducer receives the SET_MOVIES action, SET_MOVIES' value is returned. 
    default:
      return state;
  }
}

// John: I'm assuming the state for this reducer should be set to an array, since it will be holding a user object? 
function users(state = {}, action) {
  switch (action.type) {
    case DEL_USER:
      return action.value;
    default:
    return state;
  }
}

// combined reducer: elegantly groups together reducers and pass them to the state they are concerned with. 
// each reducer has its own little realm build with a previous state and an action (both passed as params) and it decides what the next state is going to look like. 
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  users
});

// presents entire movie app 
export default moviesApp;