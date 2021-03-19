import React from 'react';
import axios from 'axios';

import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Row, Col, Container, Navbar, Nav } from 'react-bootstrap';


import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      hasAccount: true
    };
  }

  //GETS movies with hook
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //Logs user out
  handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  // Gets movies from API
  getMovies(token) {
    axios.get('https://my-movie-overview.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, selectedMovie, user, hasAccount } = this.state;

    // on LoginView, when 'New User Sign Up' is clicked, goes to RegistrationView
    if (!hasAccount)
      return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onReturnLogin={this.handleReturnLogin} />

    // Renders LoginView if no user
    if (!user)
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={this.handleToRegister} />;






    if (!movies) return <div className="main-view" />;

    return (
      <React.Fragment>
        <Navbar className="navbar" bg="dark" variant="dark" expand="md">
          <Navbar.Brand href="#home">myFlix Movie Database</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Profile</Nav.Link>
              <Nav.Link onClick={this.handleLogOut}>LogOut</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className="my-3">
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
        </Container>
      </React.Fragment>
    );
  }
}