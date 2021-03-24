import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

import "./update-view.scss";

export function UpdateView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState({}); // Have John explain to me what this does
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  // Validates input data
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.trim().length < 6) {
      usernameErr.usernameShort = "Username must be at least 6 characters"; //where does usernameShort come from?
      isValid = false;
    }

    if (password.trim().length < 5) {
      passwordErr.passwordMissing = "Password must be at least 5 characters";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailErr.emailNotEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  }

  // Updates user details
  const updateDetails = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    const isValid = formValidation();
    if (isValid) {
      axios.put(`https://my-movie-overview.herokuapp.com/users/${user}`, {
        Username: username,
        Email: email,
        Birthday: birthday,
        Password: password
      }, {
        headers: { Authorization: `Bearer ${token}` } // Why this param method?
      }).then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
        alert('account details Updated')
      }).catch(() => {
        console.log("Account details did not update")
      })
    }
  }

  // Deletes user account
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete your account?")) return; //explain logic for this?
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (isValid) {
      axios.delete(`https://my-movie-overview.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/", "_self");
        alert("Your account has been deleted.");
      }).catch(() => {
        console.log(response);
      })
    }
  }

  return (
    <React.Fragment>
      <Container className="my-3 w-50 p-3">
        <h2 className="text-center mb-4 white-words">Edit Details</h2>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)} />
            {Object.keys(usernameErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>{usernameErr[key]}</div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)} />
            {Object.keys(emailErr).map((key) => {
              return ();
            })}
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control />
          </Form.Group>
          <Button className="update-button" variant="info" onClick={updateDetails}>Update</Button>
          <div className="center-btn">
            <small className="register text-danger ml-2" onClick={handleDelete}>Delete Account</small>
          </div>
        </Form>
      </Container>
    </React.Fragment>
  );
}