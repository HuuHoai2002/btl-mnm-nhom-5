import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider
} from "@mui/material";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase-config";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const UsersList = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapShot) => {
      let results = [];
      snapShot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsersList(results);
    });
  }, []);

  const hanldeDeleteUser = async (id) => {
    const colRef = doc(db, "users", id);
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Người dùng này sẽ bị xoá vĩnh viễn!",
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
          `Bạn đã xoá người dùng có id: ${id}`,
          "success"
        );
      }
    });
  };

  return (
    <div className="users-list">
      <ThemeProvider theme={darkTheme}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Tên</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Vai trò</TableCell>
                <TableCell align="left">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <div className="id">{user.id}</div>
                  </TableCell>
                  <TableCell align="left">
                    <div className="name">{user.username}</div>
                  </TableCell>
                  <TableCell align="left">
                    <div className="opacity">{user.email}</div>
                  </TableCell>
                  <TableCell align="left">
                    <div
                      className={`${
                        user.role === "admin" ? "role-admin" : "role-user"
                      }`}
                    >
                      {user.role}
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div
                      className="delete-button"
                      onClick={() => hanldeDeleteUser(user.id)}
                    >
                      Xoá
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
};

export default UsersList;
