import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // creates variables from the props passed from MainView - uses destructuring
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
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