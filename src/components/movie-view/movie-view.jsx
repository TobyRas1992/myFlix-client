import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import './movie-view.scss';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {}; // John: when we initialize an empty state in a class component, what happens with the state in MainView? JOHN - MainView is unmounted. State only relevant to this component. 
  }

  addFavorite(movie) {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.post(`https://my-movie-overview.herokuapp.com/users/${user}/${movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (response) => {
        console.log(response);
        alert('Movie has been added to list of favorites!')
      }).catch(
        function (error) {
          console.log(error)
        }
      );
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Card className="movie-view">
        <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text className="movie-description">{movie.Description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="movie-genre">
            Genre: {movie.Genre.Name}
          </ListGroupItem>
          <ListGroupItem className="movie-director">
            Director: {movie.Director.Name}
          </ListGroupItem>
          <ListGroupItem className="movie-actors">
            Actors: {movie.Actors.join(', ')}
          </ListGroupItem>
          <ListGroupItem className="movie-released">
            Released: {movie.Released}
          </ListGroupItem>
        </ListGroup>

        <Link to={`/directors/${movie.Director.Name}`}>
          <Button className="return-button" variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>

        <Button className='add-favorite'
          variant='danger'
          size='sm'
          onClick={() => this.addFavorite(movie)}>Add to favorite movies</Button>
        <Link to={`/`}>
          <Button className="return-button" variant="link">Exit Movie View</Button>
        </Link>
      </Card >
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Released: PropTypes.string,
    Actors: PropTypes.array,
    Featured: PropTypes.bool,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func
}