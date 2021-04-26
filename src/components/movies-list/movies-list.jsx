import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import { Row } from 'react-bootstrap';

const mapStateToProps = state => {
  return {
    visibilityFilter: state.visibilityFilter
  };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movie-list">
      <Row className='justify-content-center'>
        <div className='col-2'></div>
        <div className='col-6'>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </div>
        <div className="col-2"></div>
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);