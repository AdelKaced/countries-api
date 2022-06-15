import React, { useEffect, useState } from 'react';
import SignUp from '../components/SignUp';
import BlogContent from '../components/BlogContent';

// FireBase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase.config';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import Login from '../components/Login';

const Blog = () => {
  const [isActive, setIsactive] = useState('login');

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('is Render ');

    onAuthStateChanged(auth, (currentUser) => {
      console.log('isonauth', currentUser);
      if (currentUser && currentUser.displayName) {
        console.log(currentUser.displayName);
        dispatch(login(currentUser));
      }
    });
    // eslint-disable-next-line 
  }, []);

  const handleActive = (e) => {
    setIsactive(e.target.id);
  };
  console.log(user);
  return (
    <>
      {!user ? (
        <div className="blog-container">
          <div className="connect-header">
            <div
              className={
                isActive === 'signup' ? 'btn-sign-up active' : 'btn-sign-up'
              }
              id="signup"
              onClick={handleActive}
            >
              Sign Up
            </div>
            <div
              className={
                isActive === 'login' ? 'btn-login active' : 'btn-login'
              }
              id="login"
              onClick={handleActive}
            >
              Login
            </div>
          </div>
          <div className="header-btn">
            {isActive === 'signup' ? <SignUp /> : <Login />}
          </div>
        </div>
      ) : (
        <div>
          {/* {user} */}
          <BlogContent user={user} />
        </div>
      )}
    </>
  );
};

export default Blog;
