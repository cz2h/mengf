const userActions = {
  ADD_COURSE: "ADD_COURSE",
  DELETE_COURSE: "DELETE_COURSE",
};

const actions = { addCourse, deleteCourse };

function success(type, courseCode) {
  return { type: type, code: courseCode };
}

function addCourse(code) {
  return (dispatch) => {
    dispatch(success(userActions.ADD_COURSE, code));
  };
}

function deleteCourse(code) {
  return (dispatch) => {
    dispatch(success(userActions.DELETE_COURSE, code));
  };
}

export { actions, userActions };
