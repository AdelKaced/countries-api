import React, { useRef, useState } from 'react';
import { auth } from '../utils/firebase.config';

const SignUp = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = name.current.value;
    try {
      auth
        .createUserWithEmailAndPassword(
          email.current.value,
          password.current.value
        )
        .then(async (res) => {
          await res.user.updateProfile({ displayName });
          console.log(res);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="pseudo" ref={name} />
        <input type="email" placeholder="email" ref={email} />
        <input type="password" placeholder="password" ref={password} />
        <input type="submit" value="Sign Up" />
      </form>
      {error && <p>There is a problème </p>}
    </div>
  );
};

export default SignUp;
