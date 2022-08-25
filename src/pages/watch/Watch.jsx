import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import Comments from "../../components/comments/Comments";
import Episodes from "../../components/episode/Episodes";
import MovieList from "../../components/movie-list/MovieList";
import MovieRecomments from "../../components/movie-recomments/MovieRecomments";
import { CommentsProvider } from "../../contexts/comments";
import useUrlSearchParams from "../../hooks/useUrlSearchParams";
import "./watch.scss";

const Watch = () => {
  const { category } = useParams();
  const id = useUrlSearchParams("id");
  const episode = useUrlSearchParams("episode");
  const scroll = useUrlSearchParams("scroll");
  const refComments = useRef(null);

  const [movie, setMovie] = React.useState(null);

  let frame_url = apiConfig.frameUrl(category, id);

  if (category !== "movie") {
    frame_url = apiConfig.frameUrl(category, id, episode);
  }

  useEffect(() => {
    if (scroll) {
      const element = refComments.current.getBoundingClientRect();
      
      window.scroll({
        top: element.top - 70,
        behavior: 'smooth'
      });
    }
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setMovie(response);

      if (category === "movie") {
        document.title = `${response.title || response.name} - Galaxy Play`;
      } else {
        document.title = `${
          response.title || response.name
        } tập ${episode} - Galaxy Play`;
      }
    };
    getDetail();
  }, [category, episode, id, scroll]);

  return (
    <div className="watch container">
      <div className="watch-wrapper section">
        <div className="watch-frame">
          <iframe
            title="movie-frame"
            src={frame_url}
            width="100%"
            height="100%"
            allowFullScreen="allowfullscreen"
            frameBorder="0"
          ></iframe>
        </div>
        {movie && (
          <div className="watch-content">
            <div className="movie-title">
              <h1>{movie.title || movie.name}</h1>
            </div>
            <div className="movie-info">
              {category === "movie" ? (
                <MovieRecomments category={category} id={id} />
              ) : (
                <Episodes
                  category={category}
                  id={id}
                  episodesCount={movie.number_of_episodes}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <CommentsProvider category={category} id={id}>
        <Comments category={category} id={id} ref={refComments} />
      </CommentsProvider>
      <div className="section" style={{ marginTop: "30px" }}>
        <div className="section__header">
          <h2>Tương Tự</h2>
        </div>
        <MovieList category={category} type="similar" id={id} />
      </div>
    </div>
  );
};

export default Watch;
