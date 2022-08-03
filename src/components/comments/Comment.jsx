import Tippy from "@tippyjs/react";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import { auth, db } from "../../firebase/firebase-config";
import DeleteIcon from "../icon/DeleteIcon";
import FlagIcon from "../icon/FlagIcon";

const Comment = ({ data, onClick }) => {
  const [user] = useAuthState(auth);

  const handleSendReport = async () => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Chúng tôi sẽ gửi báo cáo này đến quản trị viên!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Báo cáo!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const commentsRef = collection(db, "reports");
        await addDoc(commentsRef, {
          ...data,
          report_time: new Date(),
          author_report: auth.currentUser.displayName,
          author_report_id: auth.currentUser.uid,
        });
        Swal.fire(
          "Thành Công!",
          `Đã gửi báo cáo đến Quản Trị Viên`,
          "success"
        );
      }
    });
  };
  return (
    <div className="comment">
      <div className="comment-wrapper">
        <div className="user">
          <img
            src={data?.author_avatar || "https://i.stack.imgur.com/l60Hf.png"}
            alt=""
          />
        </div>
        <div className="comment-content">
          <div className="author">
            <h3 className="name">{data?.author}</h3>
            <div className="date">
              {data?.created_at.toDate().toLocaleString("vi-VN")}
            </div>
            <Tippy
              content={
                user && (
                  <div className="comment-actions">
                    {user?.uid === data?.author_id ? (
                      <div className="item" onClick={onClick}>
                        <DeleteIcon />
                        <span>Xoá bình luận</span>
                      </div>
                    ) : (
                      <div className="item" onClick={handleSendReport}>
                        <FlagIcon size="14"/>
                        Báo cáo
                      </div>
                    )}
                  </div>
                )
              }
              interactive
              placement="bottom"
              animation="scale"
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </span>
            </Tippy>
          </div>
          <p>{data?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
