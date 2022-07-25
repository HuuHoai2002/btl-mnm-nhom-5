import React from "react";

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.href]);
  return <div></div>;
};

export default ScrollToTop;
