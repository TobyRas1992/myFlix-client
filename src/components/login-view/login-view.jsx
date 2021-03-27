import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Navbar } from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss';

function LoginView(props) {
  // Hook useState() allows functional component to manipulate state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { onRegister } = props;

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents default refresh/change page
    axios.post('https://my-movie-overview.herokuapp.com/login/', {
      Username: username,
      Password: password
    }).then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    }).catch(e => {
      console.log('no such user')
    });
  };

  return (
    <React.Fragment>
      <Navbar className="navbar" bg="dark" variant="dark">
        <Navbar.Brand>myFlix Movie Database</Navbar.Brand>
      </Navbar>
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
        <span onClick={onRegister}>Sign up for free</span>
      </Form>
    </React.Fragment>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}
export default LoginView;