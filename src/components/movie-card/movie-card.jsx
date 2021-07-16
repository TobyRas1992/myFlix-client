import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card">
        <Card.Img variant="top" className="movie-image" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Released: {movie.Released}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Show more info</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Released: PropTypes.string,
  }).isRequired
}