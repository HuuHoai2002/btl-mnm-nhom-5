import React from "react";
import { Link } from "react-router-dom";
import "./episodes.scss";

const Episodes = ({ episodesCount = 50, id, category }) => {
  const params = new URLSearchParams(window.location.search);
  const episode = params.get("episode");

  return (
    <div className="episodes">
      <div className="list-episodes">
        {new Array(episodesCount).fill(0).map((_, index) => {
          let to = `/${category}/watch?id=${id}&episode=${index + 1}`;
          return (
            <Link
              to={to}
              className={`${
                Number(episode) === index + 1 ? "episode active" : "episode"
              }`}
              key={index}
            >
              <span>{index + 1}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Episodes;
