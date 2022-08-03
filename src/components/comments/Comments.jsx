import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useComments } from "../../contexts/comments";
import { auth, db } from "../../firebase/firebase-config";
import Comment from "./Comment";
import CommentsInfo from "./CommentsInfo";
import "./index.scss";

const Comments = ({ category, id }) => {
  const [user] = useAuthState(auth);
  const [value, setValue] = React.useState("");
  const { comments } = useComments();

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
        author_id: auth.currentUser.uid,
      });
      setValue("");
    }
  };

  const hanldeDeleteComments = async (id) => {
    const colRef = doc(db, "comments", id);
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bình luận này sẽ bị xoá vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xoá!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire(
          "Xoá thành công!",
          `Bạn đã xoá bình luận có id: ${id}`,
          "success"
        );
      }
    });
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
                <Comment
                  key={comment.comment_id}
                  data={comment}
                  onClick={() => hanldeDeleteComments(comment.comment_id)}
                />
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
