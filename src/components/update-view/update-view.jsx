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
      axios.put(``, {
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
    if (!confirm("Are you sure you want to delete your account?")) return;

  }

  return (
    <React.Fragment>
      <Container>

      </Container>
    </React.Fragment>
  );
}