import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth } from '../utils/firebase.config';

const SignUp = () => {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth
        .createUserWithEmailAndPassword(
          email.current.value,
          password.current.value
        )
        .then((userAuth) => {
          userAuth.user
            .updateProfile({
              displayName,
            })
            .then(() => {
              dispatch(login(userAuth.user));
            });
        });
    } catch (error) {
      console.log(error);
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
