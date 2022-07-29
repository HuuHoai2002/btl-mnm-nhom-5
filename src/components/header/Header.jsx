import Button from "@mui/material/Button";
import Tippy from "@tippyjs/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import "tippy.js/animations/scale.css";
import { useAuth } from "../../contexts/auth";
import { auth } from "../../firebase/firebase-config";
import ArrowsDown from "../icon/ArrowsDown";
import "./header.scss";
import HeaderInfo from "./HeaderInfo";

const headerContent = [
  {
    id: 0,
    title: "Trang Chủ",
    to: "/",
  },
  {
    id: 1,
    to: "/movie",
    title: "Phim Chiếu Rạp",
  },
  {
    id: 2,
    to: "/tv",
    title: "Phim Bộ",
  },
  {
    id: 3,
    to: "/admin",
    title: "Quản trị viên",
  },
];

const Header = () => {
  const [user] = useAuthState(auth);
  const { userInfo } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <img
              id="logo"
              alt=""
              src="https://assets.glxplay.io/web/images/logoglx.svg"
              width="100"
            />
          </Link>
          <div className="header-list">
            {headerContent.map((item) => (
              <Link
                to={item.to}
                className={
                  item.to === pathname ? "header-item-active" : "header-item"
                }
                style={{
                  display:
                    item.to === "/admin" &&
                    !userInfo &&
                    userInfo?.role !== "admin"
                      ? "none"
                      : "block",
                }}
                key={item.id}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        {user ? (
          <Tippy
            hideOnClick={false}
            animation="scale"
            interactive={true}
            placement="bottom-start"
            content={<HeaderInfo user={user} />}
          >
            <div className="header-users">
              <div className="user-avatar">
                <img
                  src={
                    user.photoURL ||
                    "https://cdn.dribbble.com/users/2400293/screenshots/18034200/media/7c9ad36bd345b48cdb1a1db87ba5d096.png?compress=1&resize=768x576&vertical=top"
                  }
                  alt=""
                />
              </div>
              <ArrowsDown />
            </div>
          </Tippy>
        ) : (
          <Link to="/login" className="header-auth">
            <Button variant="contained">Đăng Nhập</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
