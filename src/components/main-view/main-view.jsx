import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// extends the React.Component class to inherit lifecycle methods
export class MainView extends React.Component {
  constructor() {
    super();
    // Initialize state with empty values 
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      hasAccount: true
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

  // Handler to navigate to RegistrationView from LoginView 
  handleToRegister = () => {
    this.setState({
      hasAccount: false
    });
  }
  //Handler to return to LoginView from RegistrationView
  handleReturnLogin = () => {
    this.setState({
      hasAccount: true
    });
  }

  // Updates user in state on successful login
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //Handler to navigate from MainView to MovieView
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  //Handler to return from MovieView to MainView
  onReturnClick() {
    this.setState({
      selectedMovie: null
    });
  }



  render() {
    const { movies, selectedMovie, user, hasAccount } = this.state;

    // on LoginView, when 'New User Sign Up' is clicked, goes to RegistrationView
    if (!hasAccount) return < RegistrationView onReturnLogin={this.handleReturnLogin} />

    // Renders LoginView if no user
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={this.handleToRegister} />;


    if (!movies) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView movie={selectedMovie} onClick={() => this.onReturnClick()} />
              </Col>
            </Row>
          )
          : (
            <Row className="justify-content-md-center">
              {movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                </Col>
              ))}
            </Row>
          )
        }
      </Row>
    );
  }
}