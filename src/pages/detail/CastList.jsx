import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import apiConfig from "../../api/apiConfig";

import tmdbApi from "../../api/tmdbApi";

const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      setCasts(res.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);
  return (
    <div className="casts">
      <h2>Diễn viên</h2>
      <div className="cast-list">
        {casts.slice(0, 4).map((item, i) => (
          <div key={i} className="casts__item">
            <img src={apiConfig.w500Image(item.profile_path)} alt="" />
            <p className="casts__item__name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
