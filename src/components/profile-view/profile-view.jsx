import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUser, delFavoriteMovie } from '../../actions/actions';

import "./profile-view.scss";
import { connect } from "react-redux";

class ProfileView extends React.Component {

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
        alert(`${movie.Title} was deleted from list of favorite movies!`);
        window.open("/profile", "_self");
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  removeFavorite(movie) {
  }

  render() {
    const favoriteList = this.props.user.FavoriteMovies. // John: is this a correct filtering?

      return(<React.Fragment>
        <Container>
          <h2 className='text-center mb-4 white-words'>Profile Details</h2>

          <Card className="profile-view">
            <Card.Body>
              <Card.Text>Username: {this.props.user.Username}</Card.Text>
              <Card.Text>Email: {this.props.user.Email}</Card.Text>
              <Card.Text>Birthday: {this.props.user.Birthday}</Card.Text>

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
        <Container className='d-flex row my-3 favorites'>
          {favoriteList.map(
            (movie) => {
              return (
                <div key={movie._id}>
                  <Card style={{ width: '10rem' }} className='favorite-card'>
                    <Link>
                      <Card.Img
                        className='movie-card-link'
                        variant='top'
                        src={movie.ImagePath} />
                    </Link>
                    <Button className='remove-favorite'
                      variant='danger'
                      size='sm'
                      onClick={() => this.removeFavorite(movie)}>Remove</Button>
                  </Card>
                </div>
              )
            }
          )}
        </Container>
      </React.Fragment >);
  }
}

let mapStateToProps = state => {
  return { user: state.user, movies: state.movies }
}
export default connect(mapStateToProps, { setUser, delFavoriteMovie })(ProfileView);