import {combineReducers} from 'redux';

import {SET_FILTER, SET_MOVIES, SET_USER, DEL_USER} from '../actions/actions';

// Reducers
// Each reducer takes a state + an action 
// If action falls within reducers realm of concern -> state is changed




function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER: 
      return action.value;
    default: // if action doesn't concern reducer, return existing state unchanged. 
      return state;
  }
}

// state initialized as empty array bc it needs to contain movie objects when they come in. 
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
    case DEL_USER:
      return action.value; // is this the correct place for this action call, or should I put it in a separate reducer?
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