import React, { useState, useRef } from 'react';
import { auth } from '../utils/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [error, setError] = useState(false);
  const email = useRef('');
  const password = useRef('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('waiting');

    try {
      await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      console.log('connected');
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" ref={email} />
        <input type="password" placeholder="password" ref={password} />
        <input type="submit" value="Log In" />
      </form>
      <p>{error ? "Email And password doesn't match" : ''}</p>
    </div>
  );
};

export default Login;
