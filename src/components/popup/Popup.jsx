import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import TimesIcon from "../icon/TimesIcon";
import "./index.scss";

const Popup = ({ children, setShow, show }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return createPortal(
    <div className="popup">
      <div className="popup-wrapper">
        <div className="popup-content">
          {children}
          <div className="popup-close">
            <div className="icon" onClick={() => setShow(false)} title="Đóng">
              <TimesIcon />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Popup;
