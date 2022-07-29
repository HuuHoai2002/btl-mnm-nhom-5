import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const Limit = () => {
  const history = useHistory();

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          Bạn không có quyền truy cập vào trang này
        </p>
        <Button
          variant="contained"
          style={{
            height: "50px",
            borderRadius: "8px",
            margin: "20px 0px",
          }}
          onClick={() => history.push("/")}
        >
          Ấn để về trang chủ
        </Button>
      </div>
    </div>
  );
};

export default Limit;
