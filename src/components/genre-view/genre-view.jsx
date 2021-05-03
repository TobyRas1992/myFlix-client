import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import './genre-view.scss';

export function GenreView(props) {

  const { genre, movies } = props;
  if (!genre) return null;

  const history = useHistory(); // John: how does useHistory work?  I've read the docs, but it's pretty dense. 

  return (
    <React.Fragment>
      <Container className='my-3 w-50 p-3'>

        <Card className="genre-view">
          <Card.Body>

            <Card.Title className='genre-title'>{genre.Name}</Card.Title>

            <Card.Text>
              {genre.Description}
            </Card.Text>

            <div className='center-btn'>
              <Button className='return-button' variant='info' onClick={() => history.goBack()} >Back to Movie</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Container className='my-3'>

        <h5 className=' text-center mb-4 white-words'>
          {genre.Name} Movies:
        </h5>

        <Row className="main-view justify-content-md-center">

          {movies.map(m => { // John: help me understand the map function fully. what is m?
            if (m.Genre.Name === genre.Name) {
              return (
                <MovieCard key={m._id} movie={m} />
              );
            }
          })}

        </Row>
      </Container>
    </React.Fragment >
  );
}


GenreView.propTypes = {
  Movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }
  })
};