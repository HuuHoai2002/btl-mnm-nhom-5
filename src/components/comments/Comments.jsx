import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebase-config";
import SendIcon from "../icon/SendIcon";
import Comment from "./Comment";
import "./index.scss";

const Comments = ({ category, id }) => {
  const [comments, setComments] = React.useState([]);

  const [value, setValue] = React.useState("");

  // get comments
  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      where("movie_type", "==", category),
      where("movie_id", "==", id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      if (data) {
        setComments(data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [category, id]);

  const handleSendComments = async () => {
    if (value.trim() === "") {
      return;
    } else {
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        movie_type: category,
        movie_id: id,
        content: value,
        created_at: new Date(),
        author: auth.currentUser.displayName,
        author_avatar: auth.currentUser.photoURL,
      });
      setValue("");
    }
  };

  return (
    <div className="container section">
      <h3 className="comments-title">Bình luận</h3>
      <div className="comments">
        <div className="comments-wrapper">
          <div className="comments-info">
            <div className="comments-total">{comments?.length} bình luận</div>
            <div className="comments-post">
              <div className="user">
                <img
                  src={
                    auth?.currentUser?.photoURL ||
                    "https://i.stack.imgur.com/l60Hf.png"
                  }
                  alt=""
                />
              </div>
              <div className="comments-input">
                <input
                  type="text"
                  placeholder="Viết bình luận ...."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="send-icon" onClick={handleSendComments}>
                  <SendIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="list-comments">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.created_at} data={comment} />
              ))
            ) : (
              <div
                style={{
                  opacity: 0.5,
                }}
              >
                <p>Chưa có bình luận nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
