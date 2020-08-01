import React, { useState } from "react";

import "./PopupBox.css";

const PopupBox = ({ content, display, setDisplay }) => {
  return (
    <div style={{ transform: "all 0.2s" }}>
      {display ? (
        <div>
          <div className="popUpContents">{content}</div>
          <div
            className={"hideHelper"}
            style={{
              zIndex: 3,
              backgroundColor: "transparent",
              position: "fixed",
              top: "0",
              left: "0",
              height: "100vh",
              width: "100vw",
            }}
            onClick={(e) => {
              setDisplay(!display);
            }}
          ></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PopupBox;
