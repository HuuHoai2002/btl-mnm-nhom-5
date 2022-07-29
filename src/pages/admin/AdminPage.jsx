import React, { useEffect } from "react";
import CommentIcon from "../../components/icon/CommentIcon";
import FlagIcon from "../../components/icon/FlagIcon";
import UserGroupIcon from "../../components/icon/UserGroupIcon";
import { useAuth } from "../../contexts/auth";
import CommentsList from "./CommentsList";
import "./index.scss";
import Limit from "./Limit";
import Reports from "./Reports";
import UsersList from "./UsersList";

const arrContent = [<UsersList />, <CommentsList />, <Reports />];
const arrDashBoardItem = [
  {
    id: 0,
    icon: <UserGroupIcon />,
    title: "Quản lý người dùng",
  },
  {
    id: 1,
    icon: <CommentIcon />,
    title: "Quản lý bình luận",
  },
  {
    id: 2,
    icon: <FlagIcon />,
    title: "Báo cáo vi phạm",
  },
];

const AdminPage = () => {
  const [changePage, setChangePage] = React.useState(0);
  const { userInfo } = useAuth();

  const handleActivePage = (index) => {
    setChangePage(index);
  };

  useEffect(() => {
    document.title = `${arrDashBoardItem[changePage].title} | Admin`;
  }, [changePage]);

  return (
    <div className="container">
      {userInfo.role === "admin" ? (
        <div className="admin">
          <div className="wrapper">
            <div className="dash-board">
              {arrDashBoardItem.map((item, index) => (
                <div
                  className={`item ${index === changePage && "active"}`}
                  onClick={() => handleActivePage(index)}
                  key={item.id}
                >
                  <div className="icon">{item.icon}</div>
                  <div className="title">{item.title}</div>
                </div>
              ))}
            </div>
            <div className="content">{arrContent[changePage]}</div>
          </div>
        </div>
      ) : (
        <Limit />
      )}
    </div>
  );
};

export default AdminPage;
