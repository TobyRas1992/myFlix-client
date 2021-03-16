import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import 'movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    // creates variables from the props passed from MainView - uses destructuring
    const { movie, onClick } = this.props;

    return (
      <Card className="movie-card">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Released: {movie.Released}</Card.Text>
          <Button variant="info" onClick={() => onClick(movie)}>Show more info</Button>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
}