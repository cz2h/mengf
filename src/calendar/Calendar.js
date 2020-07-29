import React, { useState } from "react";
import { connect } from "react-redux";

// import animation effect.
import "./Calendar.css";

const { getNumProcessor } = require("../asset/scheduler");

// Constants for table headers
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const dayToLength = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

// Test sample data
const sample = {
  Monday: [
    {
      key: "2",
      start: "10",
      end: "12",
    },
    {
      key: "1",
      start: "9",
      end: "13",
    },

    {
      key: "4",
      start: "12",
      end: "13",
    },
    {
      key: "3",
      start: "15",
      end: "17",
    },
  ],
  Tuesday: [
    {
      key: "2",
      start: "10",
      end: "12",
    },
    {
      key: "1",
      start: "9",
      end: "13",
    },
  ],
  Wednesday: [],
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

const Calanedar = ({ schedule = sample }) => {
  // Dynamically generated grids representating selected courses
  let courseGrids = [];
  for (let day in schedule) {
    let courseAtDay = schedule[day];
    let processors = getNumProcessor(courseAtDay); // number of courses
    let numProcessor = processors.length;

    let courseAtDayDivs = [];
    for (let index in processors) {
      processors[index].map((course) => {
        let divWidth = (1 / numProcessor) * 100;
        let courseDiv = (
          <div
            className="course-grid"
            style={{
              left: `${index * divWidth}%`,
              top: `${(Number(course.start) - 7) * lineHeight}%`,
              height: `${
                (Number(course.end) - Number(course.start)) * lineHeight
              }%`,
              width: `${divWidth}%`,
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
        className="day-container"
        style={{
          position: "absolute",
          left: `${dayToLength[day] * cellWidth}%`,
          top: `${lineHeight}%`,
          height: `${lineHeight * timeSlots}%`,
          width: `${0.97 * cellWidth}%`,
        }}
      >
        {courseAtDayDivs}
      </div>
    );
  }

  // Calendar with time line at the back
  const background = [
    <div className="background-row" style={rowStyle}>
      <div className="cellBox" style={cellStyle}>
        <p>Fall</p>
      </div>
      {days.map((day) => {
        return (
          <div className="cellBox" style={cellStyle}>
            <p>{day}</p>
          </div>
        );
      })}
    </div>,
  ];
  for (let i = 0; i < timeSlots; i++) {
    background.push(
      <div className="background-row" style={rowStyle}>{`${8 + i}:00`}</div>
    );
  }

  return (
    <div
      class="calendar-container"
      style={{ height: "95%", width: "100%", position: "relative" }}
    >
      {background}
      {courseGrids}
    </div>
  );
};

export default Calanedar;
