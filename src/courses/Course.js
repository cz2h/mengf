import React, { useState } from "react";

import { Card } from "antd";

import Searchbox from "./Searchbox/Searchbox";
import CourseDetail from "./CourseDetail/CourseDetail";
import { API } from "../endPoint";

const Course = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [curDisplayedDetail, setCurDisplayedCourse] = useState(null);
  const [selectedCourses, setSelectedCourse] = useState({});

  return (
    <div
      className="course-container"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <h3 className="course-container-title">My Courses</h3>
      <Searchbox
        addCourseToMySchedule={([course]) => {
          setCurDisplayedCourse(course);
          setSelectedCourse({
            ...setSelectedCourse,
            [`${course.CourseCode}${course.Session}`]: course,
          });
        }}
        CoursesMatchedListAPI={`${API}/courses/list`}
        CourseDetailAPI={`${API}/courses/detail`}
      />
      <div>Selected List of Courses</div>
      <CourseDetail
        courseInfo={curDisplayedDetail}
        setDisplayedCourse={(value) => {
          setCurDisplayedCourse(value);
        }}
      />
    </div>
  );
};

export default Course;
