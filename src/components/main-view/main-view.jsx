import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
// imports component that Mainview will pass props to
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

// extends the React.Component class to inherit lifecycle methods
export class MainView extends React.Component {
  constructor() {
    super();
    // Initialize state with empty values 
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  //GETS movies
  componentDidMount() {
    axios.get('https://my-movie-overview.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state + tells DOM state has changed
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // FUNCTIONS
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onReturnClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onRegistrationClick() {
    //code here 
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If there us no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie /* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/
          //props are passed to MovieView component + onReturnClick is also passed
          ? <MovieView movie={selectedMovie} onReturnClick={() => this.onReturnClick()} />
          //props are passed to MovieCard component with map()
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}