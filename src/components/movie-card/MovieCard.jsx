import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import apiConfig from "../../api/apiConfig";
import { category } from "../../api/tmdbApi";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card">
        <div className="movie-image">
          <img src={bg} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
