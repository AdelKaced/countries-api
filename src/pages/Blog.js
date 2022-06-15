import React, { useEffect, useState } from 'react';
import SignUp from '../components/SignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import BlogContent from '../components/BlogContent';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/userSlice';
import Login from '../components/Login';

const Blog = () => {
  const [isActive, setIsactive] = useState('login');
  // const [user, setUser] = useState(null);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  // useEffect(() => {
  // check if user is connect this method allow to get all connect data from user
  // onAuthStateChanged(auth, (currentUser) => {
  //   if (currentUser) {
  //       state.user = currentUser
  //   } else {
  //       state.user = null
  //   }
  // }).then((result) => console.log(result))

  useEffect(() => {
    console.log('is Render ');

    onAuthStateChanged(auth, (currentUser) => {
      console.log('isonauth', currentUser);
      if (currentUser && currentUser.displayName) {
        console.log(currentUser.displayName);
        dispatch(login(currentUser));
        // } else {
        //   dispatch(logout());
      }
    });
  }, []);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     unstable_batchedUpdates(() => {
  //       setLoading(false);
  //       setCurrentUser(user);
  //     });
  //     console.log("Auth state changed");
  //   });
  //   return unsu;
  // }, []);

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
