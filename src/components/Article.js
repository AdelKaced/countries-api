import axios from 'axios';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../utils/firebase.config';

const Article = ({ article, setNewRender, newRender, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(article.content);

  const handleEdit = async () => {
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updateDAte: Date.now(),
    };

    (await editContent) && updateDoc(doc(db, 'articles', article.id), data);
    setIsEditing(false);

    // axios
    //   .put(`http://localhost:3004/articles/${article.id}`, data)
    //   .then((res) => {
    //     console.log(res);
    //     setIsEditing(false);
    //   });
  };

  const dateFormater = (date) => {
    return new Date(date).toLocaleString('fr-FR');
  };

  const handleDeleteData = async () => {
    await deleteDoc(doc(db, 'articles', article.id));
    setNewRender(!newRender);

    // axios
    //   .delete(`http://localhost:3004/articles/${article.id}`)
    //   .then(() => setNewRender(!newRender));
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? '#f3feff' : 'white' }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posted on {dateFormater(article.date)} </em>
      </div>
      {isEditing ? (
        <textarea
          autoFocus
          className="text-edit"
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
          value={editContent}
        ></textarea>
      ) : (
        <p>{editContent}</p>
      )}

      {user.uid === article.authorId && (
        <div className="btn-container">
          {isEditing ? (
            <button onClick={handleEdit}>Validate</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <button onClick={handleDeleteData}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Article;
