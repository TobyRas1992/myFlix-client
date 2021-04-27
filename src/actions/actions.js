export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const DEL_USER = 'DEL_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DEL_FAVORITE = 'DEL_FAVORITE';
export const UPDATE_USER = 'UPDATE_USER';


// Action Creators - pure function that returns action itself that update state

// Initialize movie list with movies
export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value // passed from action creator 
  }
}

// filters movie list - what does it do? John
export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  }
}

// adds favorite movie to user's favorite list
export function addFavoriteMovie(value) {
  return {
    type: ADD_FAVORITE,
    value
  }
}
// deletes favorite movie to user's favorite list
export function delFavoriteMovie(value) {
  return {
    type: DEL_FAVORITE,
    value
  }
}

// initializes user with user object
export function setUser(value) {
  return {
    type: SET_USER,
    value
  }
}

// logs out user
export function logoutUser(value) {
  return {
    type: LOGOUT_USER,
    value
  }
}

// deletes user from store
export function delUser(value) {
  return {
    type: DEL_USER,
    value
  }
}

// updates user in store
export function updateUser(value) {
  return {
    type: UPDATE_USER,
    value
  }
}