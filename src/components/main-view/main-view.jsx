import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Row, Col, Container, Navbar, Nav, Jumbotron } from 'react-bootstrap';


import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      hasAccount: true
    };
  }



  // Gets movies from API
  getMovies(token) {
    axios.get('https://my-movie-overview.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` } // passes bearer authorization in header of HTTP request.
    }).then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(function (error) {
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
  onLoggedIn(authData) { // takes user + token as argument in authData.
    console.log(authData);
    this.setState({
      user: authData.user // saves user's username in the user state.
    });

    // Auth info saved in localStorage
    // setItem method accepts 2 arguments (key + value)
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token); //gets movies once user is logged in
  }

  //Logs user out
  handleLogOut() {
    // removes authenticated data from localStorage.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logged out successfully');
    window.open('/', '_self');
  }


  //Handler to navigate from MainView to MovieView
  /*   onMovieClick(movie) {
      this.setState({
        selectedMovie: movie
      });
    } */


  //Handler to return from MovieView to MainView
  onReturnClick() {
    this.setState({
      selectedMovie: null
    });
  }

  //Persisted authentication - keeps user logged in after successful onLoggedIn()
  componentDidMount() {
    let accessToken = localStorage.getItem('token'); // get value of token from localStorage.
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user') // sets user state to user in localStorage.
      });
      this.getMovies(accessToken); // if user logged in, get movies from API.
    }
  }

  render() {
    const { movies, user, hasAccount } = this.state;

    // on LoginView, when 'New User Sign Up' is clicked, goes to RegistrationView
    if (!hasAccount)
      return <RegistrationView
        onLoggedIn={user => this.onLoggedIn(user)}
        onReturnLogin={this.handleReturnLogin}
      />


    // if (!movies && !movies.length) return <div className="main-view" />;

    return (
      <Router>
        <React.Fragment>
          <header>
            <Navbar className="navbar" collapseOnSelect bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="#home">myFlix Movie Database</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link onClick={() => this.handleLogOut()}>LogOut</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <Container className="my-3">
            <Row className="main-view justify-content-md-center">

              <Route exact path="/" render={() => {
                if (!user)
                  return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={this.handleToRegister} />;
                return movies.map(m => <MovieCard key={m._id} movie={m} />)
              }
              } />

              <Route path="/register" render={() => <RegistrationView />} />

              <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

              <Route path="/directors/:name" render={({ match }) => {
                if (!movies || !movies.length) return <div className="main-view" />;
                return <DirectorView movies={this.state.movies} director={movies.find(m => m.Director.Name === match.params.name).Director} />
              }} />

              <Route path="/genres/:name"
                render={({ match }) => {
                  if (!movies || !movies.length) return <div className="main-view" />;
                  return <GenreView movies={this.state.movies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                }
                } />

              <Route path="/profile" render={() => <ProfileView user={this.state.user} movies={this.state.movies} />} />

              <Route path='/update' render={() => <UpdateView />} />

            </Row>
          </Container>
          <Jumbotron fluid className="text-center">
            <h1>myFlix Movie DataBase</h1>
            <p>The collection of my favorite movies</p>
          </Jumbotron>
          <footer className="fixed-bottom bg-dark text-white text-center">
            <p>Copyright; 2021 myFlix. All rights reserved</p>
          </footer>
        </React.Fragment>
      </Router>
    );
  }
}