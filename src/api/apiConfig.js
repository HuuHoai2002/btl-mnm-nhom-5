const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "cc4e15ebd92c1ebe17f53b1e1466a548",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
  frameUrl: (type, id, episode) => {
    switch (type) {
      case "movie": {
        return `https://www.2embed.cc/embed/${id}`;
      }
      case "tv": {
        return `https://www.2embed.cc/embedtv/${id}s=1&e=${episode}`;
      }
      default: {
        break;
      }
    }
  }
   ,
};

export default apiConfig;
