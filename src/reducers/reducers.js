import {combineReducers} from 'redux';

import {SET_FILTER, SET_MOVIES} from '../actions/actions';

// Reducers
// Each reducer takes a state + 1 action 
// If action falls within reducers realm of concern -> state is changed

// John: why use default state in reducer ""?
function visibilityFilter(state = '', action) { // first line: reducer signature. State set to default ('') so reducer won't return what unconcerned actions pass into the function instead of state. 
  switch (action.type) {
    case SET_FILTER: // if action concerns reducer, call reducer and change state
      return action.value;
    default: // if action doesn't concern reducer, return given state. 
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

// combined reducer: elegantly groups together reducers and pass them to the state they are concerned with. 
// each reducer has its own little realm build with a previous state and an action (both passed as params) and it decides what the next state is going to look like. 
const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;