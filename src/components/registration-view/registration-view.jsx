import './registration-view.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';


function RegistrationView(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer()
    } else {
      props.showError('Passwords do not match');
    }
  };

  const sendDetailsToServer = () => {
    if (state.email.lenght && state.password.length && state.username.length) {
      props.showError(null);
      const payload = {
        "Username": state.username,
        "Password": state.password,
        "Email": state.email
      }
    }
  }

  let userSchema = mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
  });

  return (
    <form>
      <label>Register new user</label>
      <label>
        Username:
        <input type="text" value={userName} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handleChange} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={handleChange} />
      </label>
      <label>
        Birthday:
        <input type="date" value={ } />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleChange} />
      </label>
      <small>We'll never share your email with anyone else.</small>
      <button type="submit" onClick={handleSubmitClick}>Register</button>
    </form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default RegistrationView;