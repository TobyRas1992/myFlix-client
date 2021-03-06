import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Navbar, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //use link for redirecting back to login

import axios from 'axios';

import './registration-view.scss';

function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const [loading, setLoading] = useState(false); // John: how does this loading work? 

  const formValidation = () => {

    if (username.trim().length < 6) {
      usernameErr = "Username must be at least 6 characters";
    } else {
      setUsernameErr('');
    }

    if (!password || password.length < 5) {
      passwordErr = "Password must be at least 5 characters"
    } else {
      setPasswordErr('');
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailErr = "A valid email address is required";
    } else {
      setEmailErr('');
    }

    return usernameErr || passwordErr || emailErr;
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setLoading(true);
    const isValid = formValidation();
    if (isValid) {
      axios.post(
        'https://my-movie-overview.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
          alert('New Account created - now log in')
        }).catch(() => {
          console.log('error registering the user')
          setLoading(false);
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
            <div style={{ color: "red" }}>
              {usernameErr}
            </div>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <div style={{ color: "red" }}>
              {emailErr}
            </div>
            <Form.Text className="text-muted">We will never share your email with anyone else</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Control
              type="text"
              value={birthday}
              placeholder="Date of Birth (YYYY-MM-DD)"
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
            <div style={{ color: "red" }}>
              {passwordErr}
            </div>
          </Form.Group>

          {!loading && <Button variant="info" type="submit" onClick={handleSubmitClick}>Sign Up</Button>}  {/* John: go over the logic for this */}
          {loading && <Button variant="info" type="submit" disabled>
            <Spinner animation="border" variant="danger" /></Button>}
        </Form>
        <small>
          Already have an account?
          <Link to="/">Return to Log In</Link>
        </small>
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