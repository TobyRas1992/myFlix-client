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
  }

  const updateDetails = (e) => { }

  const handleDelete = () => { }

  return (
    <React.Fragment>
      <Container>

      </Container>
    </React.Fragment>
  );
}