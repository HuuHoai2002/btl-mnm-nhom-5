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
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase-config";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Reports = () => {
  const [reportsList, setReportsList] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "reports");
    const q = query(colRef, orderBy("report_time", "desc"));
    onSnapshot(q, (snapShot) => {
      let results = [];
      snapShot.forEach((doc) => {
        results.push({
          report_id: doc.id,
          ...doc.data(),
        });
      });
      setReportsList(results);
    });
  }, []);

  const hanldeDeleteComments = async (idCmt, idRep) => {
    const colRefCmt = doc(db, "comments", idCmt);
    const colRefRep = doc(db, "reports", idRep);

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
        await deleteDoc(colRefCmt);
        await deleteDoc(colRefRep);
        Swal.fire(
          "Xoá thành công!",
          `Bạn đã xoá bình luận có id: ${idCmt}`,
          "success"
        );
      }
    });
  };

  console.log(reportsList);
  return (
    <div className="users-list">
      <ThemeProvider theme={darkTheme}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Người báo cáo</TableCell>
                <TableCell align="left">ID phim</TableCell>
                <TableCell align="left">Tên tác giả</TableCell>
                <TableCell align="left">Thời gian bình luận</TableCell>
                <TableCell align="left">Nội dung</TableCell>
                <TableCell align="left">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportsList.length > 0 ? (
                reportsList.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell component="th" scope="row">
                      <div className="id">{comment.author_report}</div>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`${
                          comment.movie_type.includes("movie")
                            ? `/movie/watch?id=${comment.movie_id}`
                            : `/tv/watch?id=${comment.movie_id}&episode=1`
                        }`}
                      >
                        {comment.movie_id}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <div className="name">{comment.author}</div>
                    </TableCell>
                    <TableCell align="left">
                      <div className="date opacity">
                        {comment.created_at?.toDate().toLocaleString("vi-VN")}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div className="opacity" title={comment.content}>
                        {comment.content}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div
                        className="delete-button"
                        onClick={() =>
                          hanldeDeleteComments(
                            comment.comment_id,
                            comment.report_id
                          )
                        }
                      >
                        Xoá
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <div className="name">
                      Chưa có báo cáo nào từ người dùng
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
};

export default Reports;
