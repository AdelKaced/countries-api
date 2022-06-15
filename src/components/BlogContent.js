// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from './Article';

// Firebase
import { signOut } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../utils/firebase.config';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, logout, posts, addPost } from '../features/userSlice';

const BlogContent = ({ user }) => {
  const [error, setError] = useState(false);
  // const [data, setData] = useState([]);
  const [content, setContent] = useState('');
  const [newRender, setNewRender] = useState(true);

  const dispatch = useDispatch();
  const data = useSelector(posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length < 50) {
      setError(true);
    } else {
      const data = {
        authorId: user.uid,
        author: user.displayName,
        content,
        date: Date.now(),
      };
      await addDoc(collection(db, 'articles'), data)
        .then(() => {
          dispatch(addPost(data));
        })
        .then(() => getData());
      setContent('');
      setError(false);
    }
  };

  const handleLogOut = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  const handleChange = (e) => {
    setError(false);
    setContent(e.target.value);
  };

  const getData = () => {
    getDocs(collection(db, 'articles')).then((res) =>
      dispatch(getPosts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    );
  };
// eslint-disable-next-line 
  useEffect(() => getData(), []);

  console.log(data);
  return (
    <div className="blogContent-container">
      <div className="user-header">
        <div>
          <span>{user?.displayName[0]}</span>
          <h1>{user?.displayName}</h1>
        </div>

        <button onClick={handleLogOut}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <input
          placeholder="name"
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
        /> */}
        <textarea
          style={{ border: error ? '1px solid red' : '1px solid #61dafb' }}
          placeholder="message"
          value={content}
          onChange={handleChange}
        ></textarea>
        <div className="div-button">
          {error && <p>Still remaining {50 - content.length} </p>}
          <input type="submit" value="Send" />
        </div>
      </form>
      <div className="articles">
        {data &&
          [...data]
            .sort((a, b) => b.date - a.date)
            .map((article) => (
              <Article
                key={article.id}
                article={article}
                setNewRender={setNewRender}
                newRender={newRender}
                user={user}
              />
            ))}
      </div>
    </div>
  );
};

export default BlogContent;
