import React, { useState } from "react";
import { connect } from "react-redux";

import { actions } from "../redux/action";

// import animation effect.
import "./Calendar.css";

const { getNumProcessor } = require("../asset/scheduler");

// Constants for table headers
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const dayToLength = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  FrI: 5,
};

// Constants related to course-div length
const timeSlots = 15;
const lineHeight = (1 / 16) * 100;
const cellWidth = (1 / 6) * 100;

// style constants
const cellStyle = {
  width: `${cellWidth}%`,
  height: "100%",
};

const rowStyle = {
  height: `${lineHeight}%`,
  width: "100%",
  borderBottom: "1px solid grey",
};

const Calanedar = (props) => {
  // Dynamically generated grids representating selected courses
  let myschedue = props.schedule;
  let courseGrids = [];
  for (let day in myschedue) {
    let courseAtDay = myschedue[day];
    let processors = getNumProcessor(courseAtDay); // number of courses
    let numProcessor = processors.length;

    let courseAtDayDivs = [];
    for (let index in processors) {
      processors[index].map((course) => {
        let divWidth = (1 / numProcessor) * 100;
        let courseDiv = (
          <div
            key={`${index + course.start + course.key}`}
            className="course-grid"
            style={{
              left: `${index * divWidth}%`,
              top: `${(Number(course.start) - 7) * lineHeight}%`,
              height: `${
                (Number(course.end) - Number(course.start)) * lineHeight
              }%`,
              width: `${divWidth}%`,
              overflow: "hidden",
            }}
            onClick={(e) => {
              let [code] = course.key.split(" ");
              props.setDisplayed(`${code}F`);
            }}
          >
            {course.key}
          </div>
        );
        courseAtDayDivs.push(courseDiv);
      });
    }

    courseGrids.push(
      <div
        key={`divwrapper${day}`}
        className="day-container"
        style={{
          position: "absolute",
          left: `${dayToLength[day] * cellWidth}%`,
          top: `0`,
          height: `100%`,
          width: `${0.97 * cellWidth}%`,
        }}
      >
        {courseAtDayDivs}
      </div>
    );
  }

  // Calendar with time line at the back
  const background = [
    <div className="background-row" key={"row0"} style={rowStyle}>
      <div className="cellBox" style={cellStyle}>
        <p>Fall</p>
      </div>
      {days.map((day, i) => {
        return (
          <div className="cellBox" key={`${day + i}`} style={cellStyle}>
            <p>{day}</p>
          </div>
        );
      })}
    </div>,
  ];
  for (let i = 0; i < timeSlots; i++) {
    background.push(
      <div className="background-row" key={`${i}`} style={rowStyle}>{`${
        8 + i
      }:00`}</div>
    );
  }

  return (
    <div
      className="calendar-container"
      style={{ height: "95%", width: "100%", position: "relative" }}
    >
      {background}
      {courseGrids}
    </div>
  );
};

// Redux related
const actionCreator = {
  setDisplayed: actions.setDisplayed,
};

const mapState = (state) => {
  // Use fall's calendar for simplification
  return { schedule: state.courseReducer.fallCalendar };
};

export default connect(mapState, actionCreator)(Calanedar);
