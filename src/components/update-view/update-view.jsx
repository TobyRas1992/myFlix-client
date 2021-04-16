import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

import "./update-view.scss";

export function UpdateView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState({}); // John: what does useState({}) do?
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  // Validates input data
  const formValidation = () => { //John: how does usernameErr work?
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (username.trim().length < 6) {
      usernameErr.usernameShort = "Username must be at least 6 characters"; // John: where does usernameShort come from?
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
  const handleDelete = () => { // John: should this be handled by Redux?
    if (!confirm("Are you sure you want to delete your account?")) return;
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
              onChange={e => setUsername(e.target.value)} /> {/* John: how does onChange store Username? */}
            {Object.keys(usernameErr).map((key) => { // John: How does this error check work?
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
              return (
                <div key={key} style={{ color: "red" }}>{emailErr[key]}</div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="text"
              value={birthday}
              placeholder="YYY-MM-DD"
              onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
            {Object.keys(passwordErr).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {passwordErr[key]}
                </div>
              );
            })}
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