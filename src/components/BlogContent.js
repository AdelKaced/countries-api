// import axios from 'axios';
import { signOut } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth, db } from '../utils/firebase.config';
import Article from './Article';

const BlogContent = ({ user }) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  const [newRender, setNewRender] = useState(true);
  const dispatch = useDispatch();

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
      await addDoc(collection(db, 'articles'), data);
      setError(false);
      // setAuthor('');
      setContent('');
      window.location.reload();
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
      setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => getData(), []);

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
          onChange={handleChange}
        ></textarea>
        <div className="div-button">
          {error && <p>Still remaining {50 - content.length} </p>}
          <input type="submit" value="Send" />
        </div>
      </form>
      <div className="articles">
        {data.length > 0 &&
          data
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
