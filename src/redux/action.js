const userActions = {
  ADD_SECTION: "ADD_SECTION",
  DELETE_SECTION: "DELETE_SECTION",
  SET_DISPLAYED: "SET_DISPLAYED",
};

const actions = {
  addCourse: addSection,
  deleteCourse: deleteSection,
  setDisplayed: setDisplayed,
};

function success(type, courseCode, semester, detail) {
  return { type: type, code: courseCode, semester: semester, detail: detail };
}

/**
 * @param {*} code :Course code like "ECE1774H"
 * @param {*} semester :F or W or S
 * @param {*} detail :{type, time:{date:{start, end}}}
 */
function addSection(code, semester, detail) {
  return (dispatch) => {
    dispatch(success(userActions.ADD_SECTION, code, semester, detail));
  };
}

/**
 * @param {*} code :Course code like "ECE1774H"
 * @param {*} semester :F or W or S
 * @param {*} detail :{type, time:{date:{start, end}}}
 */
function deleteSection(code, semester, detail) {
  return (dispatch) => {
    dispatch(success(userActions.DELETE_SECTION, code, semester, detail));
  };
}

/**
 *
 * @param {String} code : Code like "ECE1774H"
 */
function setDisplayed(code) {
  return (dispatch) => {
    dispatch(success(userActions.SET_DISPLAYED, code));
  };
}

export { actions, userActions };
