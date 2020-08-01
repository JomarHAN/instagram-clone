import React, { useState, useEffect } from "react";
import "./Posts.css";
import { Avatar, Input, Button } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase";

function Posts({ username, userComment, imageUrl, caption, postId }) {
  const [commentInput, setCommentInput] = useState([]);
  const [commentPost, setCommentPost] = useState([]);

  const handleComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        userComment: userComment.displayName,
        comment: commentInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setCommentInput("");
  };

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setCommentPost(
            snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
          )
        );
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <strong>{username}</strong>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <div className="post__caption">
        <strong>{username}:</strong> {caption}
      </div>
      {commentPost.map(({ comment, id }) => (
        <div className="post__commentBox">
          <strong key={id}>{comment.userComment} :</strong> {comment.comment}
        </div>
      ))}
      {userComment && (
        <div className="post__inputComment">
          <Input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="inputComment"
            placeholder="Add a comment..."
          />

          <Button
            disabled={!commentInput}
            onClick={handleComment}
            className="submitComment"
          >
            Post
          </Button>
        </div>
      )}
    </div>
  );
}

export default Posts;
