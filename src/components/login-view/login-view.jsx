import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

import './login-view.scss';

function LoginView(props) {
  // Hook useState() allows functional component to manipulate state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { onRegister } = props;

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents default refresh/change page when submitting form
    axios.post('https://my-movie-overview.herokuapp.com/login/', {
      Username: username,
      Password: password
    }).then(response => {
      const data = response.data; // binds response auth data to variable 
      props.onLoggedIn(data); // calls onLoggedIn, which was passed from MainView, and handles BOTH username and token.
    }).catch(e => {
      console.log('no such user')
    });
  };

  return (
    <React.Fragment>
      <Form className="form-login">
        <h1 className="text-danger">Welcome to myFlix!</h1>
        <p className="mb-5">Please login to continue.</p>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
    </Button> {' '}
        <small>Not a member yet?</small>
        <Link to="/register">Sign up for free</Link>
      </Form>
    </React.Fragment>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}
export default LoginView;