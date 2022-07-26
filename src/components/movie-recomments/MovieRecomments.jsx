import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import StarIcon from "../../components/icon/StarIcon";
import "./index.scss";

const MovieRecomments = ({ category, id }) => {
  const [movie, setMovie] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await tmdbApi.recommendations(category, id);
      setMovie(response.results);
    };

    getData();
  }, [category, id]);

  return (
    <div className="recommendations">
      {movie &&
        movie.map((item) => (
          <div className="movie-card-re" key={item.id}>
            <div className="wrapper">
              <div className="image">
                <img
                  src={
                    item.poster_path
                      ? apiConfig.w500Image(item.poster_path)
                      : "https://cdn.dribbble.com/userupload/2905384/file/original-93c7c3593e7d733ddd8ca2fd83ac0ed4.png?compress=1&resize=1024x768"
                  }
                  alt="poster"
                />
              </div>
              <div className="content">
                <div className="title">{item.title}</div>

                <div className="wrapper">
                  <span className="release">
                    {new Date(
                      item.release_date || item.first_air_date || new Date()
                    ).getFullYear()}
                  </span>
                  <span className="vote">
                    {item.vote_average.toFixed(1)}
                    <StarIcon />
                  </span>
                </div>
                <div className="watch-now">
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "5px",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => history.push(`/movie/watch?id=${item.id}`)}
                  >
                    Xem ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieRecomments;
