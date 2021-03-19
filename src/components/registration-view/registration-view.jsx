import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Navbar, Container, Spinner } from 'react-bootstrap';

import axios from 'axios';

import './registration-view.scss';

function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = ({});

  const [loading, setLoading] = useState(false);

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.trim().length < 6) {
      usernameErr.usernameShort = "Username must be at least 6 characters";
      isValid = false;
    }

    if (passwordErr.passwordMissing = "Password must be at least 5 characters");

    if (!email.includes(".") && !email.includes("@")) {
      emailErr.emailNotEmail = "A valid email address is required";
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  }
  const { handleReturnLogin } = props;

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setLoading(true);
    const isValid = formValidation();
    if (isValid) {
      axios.post(
        axios.post('', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
      ).then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
        alert('New Account created - now log in')
      }).catch(() => {
        console.log('error registering the user')
      })
    }
  };


  return (
    <React.Fragment>
      <Navbar className="navbar" bg="dark" variant="dark">
        <Navbar.Brand>myFlix Movie Database</Navbar.Brand>
      </Navbar>

      <Container className="my-4 w-50 p-3">
        <h2 className="text-center mb-4">
          Welcome to myFlix Movie Database!
        </h2>
        <p className="text-center">
          Create an account and start exploring.
        </p>
        <Form>

          <Form.Group controlId="formUsername">
            <Form.Label>Registration</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">We will never share your email with anyone else</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Control
              type="text"
              value={birthday}
              placeholder="Birthday"
              onChange={e => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="info" type="submit" onClick={handleSubmitClick}>Sign Up</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string
}

export default RegistrationView;