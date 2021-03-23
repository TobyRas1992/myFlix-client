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

  }
}