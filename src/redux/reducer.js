import { combineReducers } from "redux";
import { userActions } from "./actions";

// All selected courses, detail of courses are stored in Course component
const initState = { selectedCourses: ["ECE1774H"] }; // test data

function courseReducer(state = initState, action) {
  switch (action.type) {
    case userActions.ADD_COURSE:
      return { selectedCourses: [...state.selectedCourses, action.code] };
    case userActions.DELETE_COURSE:
      let courses = state.selectedCourses.reduce((accum, val) => {
        if (val === action.code) {
          return accum;
        } else {
          return [...accum, val];
        }
      }, []);
      return { selectedCourses: courses };
  }
}

const rootReducer = combineReducers({
  courseReducer,
});

export default rootReducer;
