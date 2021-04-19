import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MovieList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
/* import { MovieCard } from '../movie-card/movie-card'; */
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";


import { Row, Container, Navbar, Nav, Jumbotron } from 'react-bootstrap';


import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      /*       movies: [], */
      /*       selectedMovie: null, */
      user: null,
      hasAccount: true
    };
  }



  // Gets movies from API
  getMovies(token) {
    axios.get('https://my-movie-overview.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      // #1
      this.props.setMovies(response.data);
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

  //Persisted authentication 
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user') // sets user state to user in localStorage.
      });
      this.getMovies(accessToken); // if user logged in, get movies from API.
    }
  }

  render() {
    // #2
    let { movies } = this.props;
    let { user } = this.state;
    const { hasAccount } = this.state; //maybe delete?

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
              {/* route components used for routing calls */}
              <Route exact path="/" render={() => {
                if (!user)
                  return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={this.handleToRegister} />;
                /*  return movies.map(m => <MovieCard key={m._id} movie={m} />) */
                return <MovieList movies={movies} />;
              }
              } />

              <Route path="/register" render={() => <RegistrationView />} />

              <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

              <Route path="/directors/:name" render={({ match }) => {
                if (!movies || !movies.length) return <div className="main-view" />;
                return <DirectorView movies={this.state.movies} director={movies.find(m => m.Director.Name === match.params.name).Director} /> /* adding director key to returned object gets director information */
              }} />

              <Route path="/genres/:name"
                render={({ match }) => {
                  if (!movies || !movies.length) return <div className="main-view" />;
                  return <GenreView movies={this.state.movies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} /> /* adding genre key to returned movie object gets genre information  */
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

// #3
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);