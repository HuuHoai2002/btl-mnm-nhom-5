import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase-config";
import Comment from "./Comment";
import CommentsInfo from "./CommentsInfo";
import "./index.scss";

const Comments = ({ category, id }) => {
  const [comments, setComments] = React.useState([]);
  const [user] = useAuthState(auth);
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
      toast.error("Bình luận không được để trống", {
        pauseOnHover: false,
      });
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
          {user ? (
            <CommentsInfo
              comments={comments}
              onClick={handleSendComments}
              value={value}
              setValue={setValue}
            />
          ) : (
            <div className="logger">
              <span>
                Vui lòng{" "}
                <Link to="/login" className="link">
                  đăng nhập
                </Link>{" "}
                để bình luận
              </span>
            </div>
          )}

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
