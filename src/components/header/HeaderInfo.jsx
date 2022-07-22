import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/firebase-config";
import LogoutIcon from "../icon/LogoutIcon";
import UserIcon from "../icon/UserIcon";
import "./header.scss";

const HeaderInfo = ({ displayName }) => {
  const handleSignout = async () => {
    await signOut(auth);
  };
  return (
    <div className="header-info">
      <div className="users">
        <div className="user-info">
          <img
            src="https://cdn.dribbble.com/users/2400293/screenshots/18034200/media/7c9ad36bd345b48cdb1a1db87ba5d096.png?compress=1&resize=768x576&vertical=top"
            alt=""
          />
          <span className="user-name">{displayName}</span>
        </div>
      </div>
      <div className="header-content">
        <div className="header-content-item">
          <UserIcon />
          Tài khoản
        </div>
        <div className="header-content-item" onClick={handleSignout}>
          <LogoutIcon />
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
