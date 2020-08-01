import React, { useState } from "react";

import "./CourseDetail.css";

import { parseTimeString } from "../../asset/timeConverter";

/**
 *
 * @param {*} timeString :"Date#Start-End\n..."
 * @returns {date:{start, end}}
 */
function getTimeDetail(timeString) {
  let lectures = timeString.split(/\n+/);
  let res = {};
  for (let index in lectures) {
    let [day, time] = lectures[index].split("#");
    let [start, end] = time.split("-");
    // Convert start, end to 24 hour standard
    res[day] = { start: parseTimeString(start), end: parseTimeString(end) };
  }
  return res;
}
/**
 @param courseDetail: {"lec\d/tut":"Day\s?\n\n(timea-->timeb)"...}
 @param mySelectedCourses: ["lec1000", "lec2000"...]
 @return [<span key={} >lec_i</span>]
 */
function getDivByTime(
  courseDetail,
  mySelectedCourses,
  addCourseToSchedule,
  deleteCourseFromSchedule
) {
  let lectures = [];
  let tutorials = [];
  let selectedSectionOfThisCourse = mySelectedCourses[courseDetail.CourseCode]
    ? mySelectedCourses[courseDetail.CourseCode]
    : [];

  let allSections = {};

  // Parse to time Object
  for (let section in courseDetail.Days) {
    let courseCodeSection = `${section}`;
    allSections[courseCodeSection] = {};
    let lectures = courseDetail.Days[section].split(/\\n+/);
    for (let index in lectures) {
      let lectureObj = getTimeDetail(lectures[index]);
      allSections[courseCodeSection] = {
        ...allSections[courseCodeSection],
        ...lectureObj,
      };
    }
  }

  for (let section in allSections) {
    let haveBeenSelected = false;
    for (let selectedLecture in selectedSectionOfThisCourse) {
      if (selectedLecture === section) {
        haveBeenSelected = true;
      }
    }
    let onClickFunction = haveBeenSelected
      ? (e) => {
          deleteCourseFromSchedule(
            courseDetail.CourseCode,
            courseDetail.Session,
            {
              type: section,
              time: allSections[section],
            }
          );
        }
      : (e) => {
          addCourseToSchedule(courseDetail.CourseCode, courseDetail.Session, {
            type: section,
            time: allSections[section],
          });
        };
    let divObject = (
      <span
        key={`${section}`}
        className={haveBeenSelected ? "time-slot-selected" : "time-slot"}
        onClick={onClickFunction}
      >{`${section}`}</span>
    );
    if (/.*lec.*/.test(section)) {
      lectures.push(divObject);
    } else if (/.*tut.*/.test(section)) {
      tutorials.push(divObject);
    }
  }

  return [...lectures, ...tutorials];
}

const CourseDetail = ({
  courseInfo, // same as the feteched from DB.
  addSectionToSchedule,
  deleteSectionToSchedule,
  mySelectedCourses,
  closeCurDisplayed,
}) => {
  let targetSemester;
  switch (courseInfo.Session) {
    case "F":
      targetSemester = mySelectedCourses.fall;
      break;
    case "W":
      targetSemester = mySelectedCourses.winter;
      break;
    case "S":
      targetSemester = mySelectedCourses.summer;
      break;
  }
  let sections = getDivByTime(
    courseInfo,
    targetSemester,
    addSectionToSchedule,
    deleteSectionToSchedule
  );
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
      >
        <h4>{`${courseInfo.CourseCode}:${courseInfo.Title}`}</h4>
        <p>
          <strong>{"Instructor: "}</strong>
          {` ${courseInfo.Instructor}`}
        </p>
        <p>
          <strong>{"Location: "}</strong>
          {`${courseInfo.Room}`}
        </p>
        <p>
          <strong>{"Section: "}</strong>
          {sections}
        </p>
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
          closeCurDisplayed();
        }}
      ></div>
    </div>
  ) : (
    <div></div>
  );
};

export default CourseDetail;
