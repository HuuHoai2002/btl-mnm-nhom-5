import React from "react";

const Comment = ({ data }) => {
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
          </div>
          <p>{data?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
