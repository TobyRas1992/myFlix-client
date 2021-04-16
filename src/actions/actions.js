export const SET_MOVIES = 'SET_MOVIES'; // variable set equal to string version of variable (action type)
export const SET_FILTER = 'SET_FILTER';


// Action Creators - pure function that returns action itself that update state

// Initialize movie list with movies
export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value // passed from action creator 
  }
}

// filters movie list - what does it do? 
export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  }
}