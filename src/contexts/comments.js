import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

const CommentContext = createContext();

function CommentsProvider(props) {
  const [_comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("created_at", "desc"));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        comment_id: doc.id,
        ...doc.data(),
      }));
      setComments(data);
    });
  }, []);

  const comments = _comments.filter(
    (comment) =>
      comment.movie_id === props?.id && comment.movie_type === props?.category
  );

  const value = { comments };
  return (
    <CommentContext.Provider value={value} {...props}></CommentContext.Provider>
  );
}

function useComments() {
  const context = useContext(CommentContext);
  if (typeof context === "undefined")
    throw new Error("useComments must be used within CommentsProvider");
  return context;
}

export { CommentsProvider, useComments };
