import axios from "axios";
import { API as endPoint } from "../endPoint.js";

const userConstants = {
  SEARCH_LIST_COURSES_REQUEST: "SEARCH_LIST_COURSES_REQUEST",
  SEARCH_SPECIFIC_COURSE_REQUEST: "SEARCH_SPECIFIC_COURSE_REQUEST",
  SEARCH_COURSES_SUCCESS: "SEARCH_COURSES_SUCCESS",
  SEARCH_DETAIL_SUCCESS: "SEARCH_DETAIL_SUCCESS",
  SEARCH_FAILURE: "SEARCH_FAILURE",
};

const actions = { searchCourses, searchCourseDetail };

function success(type, listCourses) {
  return { type: type, courses: listCourses };
}

function failure(error) {
  return { type: userConstants.SEARCH_FAILURE, error: error };
}

// Want to query list of qualified courses
function searchCourses(department, codePrefix) {
  return (dispatch) => {
    axios.get(`${endPoint}/courses/${department}/${codePrefix}`).then(
      (res) => {
        if (res.Count === 0) {
          return dispatch(failure("No satisfied course founded"));
        } else {
          const satisFiedCourses = res.Items;
          dispatch(
            success(userConstants.SEARCH_COURSES_SUCCESS, satisFiedCourses)
          );
        }
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

// Search for a specific course.
function searchCourseDetail(courseId) {
  return (dispatch) => {
    axios.get(`${endPoint}/courses/details/${courseId}`).then(
      (res) => {
        if (res.Count === 0) {
          return dispatch(failure("No satisfied course founded"));
        } else {
          const satisFiedCourses = res.Items;
          dispatch(
            success(userConstants.SEARCH_DETAIL_SUCCESS, satisFiedCourses)
          );
        }
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

export { userConstants, actions };
