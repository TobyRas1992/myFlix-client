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
      favoritemovies: []
    };
  }

  render() {
    const { movies } = this.props;
    const favoriteMovieList = movies.filter(movie => {
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

            <Link to {`/update`}>
              <div className="center-btn">
                <small className="register text-danger ml-2">Update details</small>
              </div>
            </Link>

            <Link to {`/`}>
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

      <Container ="d-flex row my-3 favorites">

      </Container>
    </React.Fragment >);

  }
}