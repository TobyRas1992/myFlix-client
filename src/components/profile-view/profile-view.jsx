import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      birthday: "",
      password: "",
      movies: "",
      favoriteMovies: []
    };
  }


  // GET user from API
  getUser = (token, user) => {
    axios.get(`https://my-movie-overview.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      response => {
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          birthday: this.formatDate(response.data.Birthday),
          password: response.data.Password,
          favoriteMovies: response.data.FavoriteMovies
        });
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  // Persisted authentication - keeps user details
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getUser(accessToken, localStorage.getItem('user'));
    }
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  removeFavorite(movie) { // ask John if Redux will be used for this. 
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios.delete(`https://my-movie-overview.herokuapp.com/users/${user}/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (response) => {
        console.log(response);
        // this.componentDidMount();
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies } = this.props;
    const favoriteMovieList = movies.filter(movie => { // John: why doesn't this return just one movie?
      return this.state.favoriteMovies.includes(movie._id);
    });

    return (<React.Fragment>
      <Container>
        <h2 className='text-center mb-4 white-words'>Profile Details</h2>

        <Card className="profile-view">
          <Card.Body>
            <Card.Text>Username: {this.state.username}</Card.Text>
            <Card.Text>Email: {this.state.email}</Card.Text>
            <Card.Text>Birthday: {this.state.birthday}</Card.Text>

            <Link to={`/update`}>
              <div className="center-btn">
                <small className="register text-danger ml-2">Update details</small>
              </div>
            </Link>

            <Link to={`/`}>
              <div className="center-btn">
                <Button className="return-button" variant="info">Return to Movie List</Button>
              </div>
            </Link>
          </Card.Body>
        </Card>
      </Container>

      <Container className="my-3">
        <h2 className="text-center mb-4 white-words">Favorite Movies</h2>
      </Container>

      <Container className="d-flex row my-3 favorites">
        {favoriteMovieList.map(
          (movie) => {
            return (
              <div key={movie._id}>
                <Card style={{ width: '10rem' }} className='favorite-card'>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img
                      className="movie-card-link"
                      variant="top"
                      src={movie.ImagePath} />
                  </Link>
                  <Button
                    className="remove-favorite"
                    variant="danger"
                    size="sm"
                    onClick={() => this.removeFavorite(movie)}>
                    Remove
                  </Button>

                </Card>
              </div>
            );
          }
        )}
      </Container>
    </React.Fragment >);

  }
}