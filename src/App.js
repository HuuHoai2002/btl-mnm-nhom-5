import "swiper/swiper.min.css";
import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

import { BrowserRouter, Route } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import InfoGroup from "./components/info-group/InfoGroup";

import { useEffect, useState } from "react";
import Popup from "./components/popup/Popup";
import Routes from "./config/Routes";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 1000);
  }, []);

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <>
            <Header {...props} />
            {showPopup && (
              <Popup show={showPopup} setShow={setShowPopup}>
                <InfoGroup />
              </Popup>
            )}
            <Routes />
            <Footer />
          </>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
