import Button from "@mui/material/Button";
import Tippy from "@tippyjs/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import "tippy.js/animations/scale.css";
import { auth } from "../../firebase/firebase-config";
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
    to: "/tvseries",
    title: "Phim Bộ",
  },
];
const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-left">
          <NavLink to="/" className="header-logo">
            <img
              id="logo"
              alt=""
              src="//assets.glxplay.io/web/images/logoglx.svg"
              width="100"
            />
          </NavLink>
          <div className="header-list">
            {headerContent.map((item) => (
              <NavLink
                to={item.to}
                className={(isActive) =>
                  isActive ? "header-item active" : "header-item"
                }
                key={item.id}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
        {user ? (
          <Tippy
            hideOnClick={false}
            animation="scale"
            interactive={true}
            placement="bottom-start"
            content={<HeaderInfo displayName={user.displayName} />}
          >
            <div className="header-users">
              <div className="user-avatar">
                <img
                  src="https://cdn.dribbble.com/users/2400293/screenshots/18034200/media/7c9ad36bd345b48cdb1a1db87ba5d096.png?compress=1&resize=768x576&vertical=top"
                  alt=""
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                viewBox="0 0 20 20"
                fill="#fff"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
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
