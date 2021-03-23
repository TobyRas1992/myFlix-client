
import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import './director-view.scss'

export function DirectorView(props) {
  const { director, movies } = props;
  if (!director) return null;
  const history = useHistory();

  return (
    <React.Fragment>
      <Container className="my-3 w-50 p-3">
        <Card className="director-view">
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <Container></Container>

    </React.Fragment>
  );
}

DirectorView.PropTypes = {
  Movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }
  }
  )
};