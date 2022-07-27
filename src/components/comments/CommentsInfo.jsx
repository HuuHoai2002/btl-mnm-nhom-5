import React from "react";
import { auth } from "../../firebase/firebase-config";
import SendIcon from "../icon/SendIcon";

const CommentsInfo = ({ value, setValue, comments, onClick }) => {
  return (
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
          <div className="send-icon" onClick={onClick}>
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsInfo;
