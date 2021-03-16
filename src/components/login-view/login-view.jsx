import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { onRegister } = props; //what does this do, Andy?

  const handleSubmit = () => {
    e.preventDefault(); //prevents default refresh/change page
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <Form>
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
  );
}

LoginView.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginView;