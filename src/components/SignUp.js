import React, { useRef, useState } from 'react';
import { auth } from '../utils/firebase.config';

const SignUp = () => {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(false);

  const [displayName, setDisplayName] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      auth
        .createUserWithEmailAndPassword(
          email.current.value,
          password.current.value
        )
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName,
          });
          window.location.reload();
        });
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="pseudo"
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input type="email" placeholder="email" ref={email} />
        <input type="password" placeholder="password" ref={password} />
        <input type="submit" value="Sign Up" />
      </form>
      {error && <p>There is a problème </p>}
    </div>
  );
};

export default SignUp;
