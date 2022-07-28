import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

import { category, movieType, tvType } from "../api/tmdbApi";

const Home = () => {
  useEffect(() => {
    document.title = "Trang chủ | Galaxy Play";
  }, []);
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section">
          <div className="section__header">
            <h2>Phim Chiếu Rạp Phổ Biến</h2>
            <Link to="/movie">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section">
          <div className="section__header">
            <h2>Phim Chiếu Rạp Có Đánh Giá Cao</h2>
            <Link to="/movie">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section">
          <div className="section__header">
            <h2>Phim Bộ Phổ Biến</h2>
            <Link to="/tv">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Phim Bộ Có Đánh Giá Cao</h2>
            <Link to="/tv">
              <OutlineButton className="small">Xem thêm</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default Home;
