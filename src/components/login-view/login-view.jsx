import React, { useState } from 'react';
import PropTypes from 'prop-types';


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
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Login</button> {' '}
      <small>Not a member yet?</small>
      <span onClick={onRegister}>Sign up for free</span>
    </form>
  );
}

LoginView.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginView;