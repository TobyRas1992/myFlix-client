import React, { useState } from 'react';
import PropTypes from 'prop-types';


function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(username, email, password, birthday);
    props.onLoggedIn(username);
  };


  return (
    <form>
      <label>Register new user</label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setPassword(e.target.value)} />
      </label>
      <small>We'll never share your email with anyone else.</small>
      <label>
        Birthday:
        <input type="text" value={birthday} onChange={e => (e.target.value)} />
      </label>
      <label>
        Password:
        <input type="email" value={password} onChange={e => (e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="email" value={confirmPassword} onChange={e => (e.target.value)} />
        <button type="submit" onClick={handleSubmitClick}>Sign Up</button>
      </label>
    </form>
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