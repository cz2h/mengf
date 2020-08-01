import React, { useState } from "react";

import { connect } from "react-redux";
import { actions } from "../redux/action";

import Searchbox from "./Searchbox/Searchbox";
import CourseDetail from "./CourseDetail/CourseDetail";
import { API } from "../endPoint";

const Course = (props) => {
  // Open the detail box or not.
  const [openDetailBoxOrNot, openDetailBox] = useState(false);
  // {code:detail}, used for fetching course details locally.
  const [courseBuffer, setCourseBuffer] = useState({});
  return (
    <div
      className="course-container"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <h3 className="course-container-title">My Courses</h3>
      <Searchbox
        addCourseToMySchedule={([courseDetail]) => {
          // Convert string fields into objects
          courseDetail.Days = JSON.parse(courseDetail.Days);
          // Add course detail to buffer
          setCourseBuffer({
            ...courseBuffer,
            [`${courseDetail.CourseCode}${courseDetail.Session}`]: courseDetail,
          });
          // and then display the detail box
          props.setDisplayed(
            `${courseDetail.CourseCode}${courseDetail.Session}`
          );
          openDetailBox(true);
        }}
        CoursesMatchedListAPI={`${API}/courses/list`}
        CourseDetailAPI={`${API}/courses/detail`}
      />
      <div>Selected List of Courses</div>
      {props.curDisplay !== "" ? (
        <CourseDetail
          curCourseCode={props.curDisplay}
          courseInfo={courseBuffer[props.curDisplay]}
          addSectionToSchedule={(code, semester, detail) => {
            props.addCourse(code, semester, detail);
          }}
          deleteSectionToSchedule={(code, semester, detail) => {
            props.deleteCourse(code, semester, detail);
          }}
          mySelectedCourses={props.selectedCourses}
          closeCurDisplayed={() => props.setDisplayed("")}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const actionsCreator = {
  setDisplayed: actions.setDisplayed,
  addCourse: actions.addCourse,
  deleteCourse: actions.deleteCourse,
};

const mapState = (state) => {
  return {
    selectedCourses: state.courseReducer.selectedCourses,
    curDisplay: state.courseReducer.curDisplay,
  };
};

export default connect(mapState, actionsCreator)(Course);
