import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import BlogContent from '../components/BlogContent';

const Blog = () => {
  const [isActive, setIsactive] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
  // check if user is connect this method allow to get all connect data from user
  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
    setUser(currentUser);
  });
  }, []);

  const handleActive = (e) => {
    setIsactive(e.target.id);
  };

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
          <BlogContent user={user} />
        </div>
      )}
    </>
  );
};

export default Blog;
