import React, { useState } from "react";

import "./CourseDetail.css";
const CourseDetail = ({ courseInfo, setDisplayedCourse }) => {
  return courseInfo ? (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div
        className="coursedetail-container"
        style={{
          position: "relative",
          top: "-5%",
          left: "103%",
          height: "50%",
          width: "100%",
          zIndex: "10",
        }}
        onClick={(e) => {
          //   console.log("course detail");
        }}
      >
        course detail
      </div>
      {/* clean up helper     */}
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
          setDisplayedCourse(null);
        }}
      ></div>
    </div>
  ) : (
    <div></div>
  );
};

export default CourseDetail;
