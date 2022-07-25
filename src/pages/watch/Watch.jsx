import React from "react";
import { useParams } from "react-router-dom";
import "./watch.scss";

const Watch = () => {
  const params = new URLSearchParams(window.location.search);
  const { category } = useParams();
  const id = params.get("id");
  console.log(id);
  return (
    <div className="watch container" style={{ minWidth: "100vh" }}>
      <h1 className="text-3xl font-bold underline text-red-500 mt-60">
        Hello world!
      </h1>
    </div>
  );
};

export default Watch;
