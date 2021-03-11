import './registration-view.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';


function RegistrationView(props) {
  const [username, setUsername] = useState(''); // assigns empty string + update method 
  const [password, setPassword] = useState(''); // assigns empty string + update method
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    e.preventDefault(); //prevents default refresh/change page
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
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
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );

}

export default RegistrationView;