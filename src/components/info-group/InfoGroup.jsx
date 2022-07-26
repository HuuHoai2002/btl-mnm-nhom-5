import React from "react";
import "./index.scss";

//https://cdn.dribbble.com/userupload/2549424/file/original-f8f0e578682738dba350240628eaa730.png?compress=1&resize=1024x768 , js-engine

//https://cdn.dribbble.com/userupload/2558451/file/original-f2ef0c4c60964a805ee7353a3ba725f5.png?compress=1&resize=1024x768 ts-factory

//https://cdn.dribbble.com/userupload/2448941/file/original-2614b1a5b17e13824c57fdef108bff95.png?compress=1&resize=1024x768 navigating-the-cloud
const InfoGroup = () => {
  return (
    <div className="info-group">
      <div className="wrapper">
        <div className="info-group-content">
          <img
            src="https://cdn.dribbble.com/users/2417352/screenshots/6486322/terraforge_illustration_4x.png?compress=1&resize=768x576&vertical=top"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          <div className="content-detail">
            <h3>Bài Tập Lớn Mã Nguồn Mở , Nhóm 5</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoGroup;
