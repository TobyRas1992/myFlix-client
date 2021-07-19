import React from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';


// #0 imports actions to modify store 
import { setMovies, setUser } from '../../actions/actions';

import MovieList from '../movies-list/movies-list';

import { MovieView } from '../movie-view/movie-view';
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import ProfileView from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";


import { Row, Container, Navbar, Nav, Jumbotron, Button } from 'react-bootstrap';

import './main-view.scss';


class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
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

  // Updates user in state on successful login
  onLoggedIn(authData) { // takes user + token as argument in authData.
    console.log(authData);
    // this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.props.setUser(authData.user);
  }

  //Logs user out
  handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logged out successfully');
    this.props.setUser(null); //John: correct method for setting user state in redux to empty? 
    window.open('/', '_self');
  }

  //Persisted authentication 
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
      <MainView />
    }
  }

  render() {
    // John: how should I handle the user extraction?
    let { movies, user } = this.props;
    const { hasAccount } = this.state;

    // on LoginView, when 'New User Sign Up' is clicked, goes to RegistrationView
    if (!hasAccount)
      return <RegistrationView
        onLoggedIn={user => this.onLoggedIn(user)}
        onReturnLogin={this.handleReturnLogin}
      />


    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <React.Fragment>
          <header>
            <Navbar className="navbar" collapseOnSelect bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="#home">myFlix Movie Database</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Container className='navBarElements'>
                    <Link id="homeLink" className='navBarLink' to="/">Home</Link>
                    <Link id="profileLink" className='navBarLink' to="/profile">Profile</Link>
                    <Button variant="outline-light" className='navBarLink' onClick={() => this.handleLogOut()}>LogOut</Button>
                  </Container>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <Container className="my-3">
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                if (!user)
                  return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return <MovieList movies={movies} />;
              }
              } />

              <Route path="/register" render={() => <RegistrationView />} />

              <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

              <Route path="/directors/:name" render={({ match }) => {
                if (!movies || !movies.length) return <div className="main-view" />;
                return <DirectorView movies={movies} director={movies.find(m => m.Director.Name === match.params.name).Director} />
              }} />

              <Route path="/genres/:name"
                render={({ match }) => {
                  if (!movies || !movies.length) return <div className="main-view" />;
                  return <GenreView movies={movies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                }
                } />

              <Route path="/profile" render={() => <ProfileView movies={movies} />} />

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

// #3 gets state from store and passes it as props to components connected to the store. Thus, components access state as props and not directly. 
const mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

// #4 connect component to store. John: explain to me how connect() works. 
// connect () accepts 4 arguments and returns a function. 
// mapStateToProps allows MainView to subscribe to store updates. Any time store updates, the function is called. mapStateToProps takes the store state as argument and returns the new props for the component. 
export default connect(mapStateToProps, { setMovies, setUser })(MainView);