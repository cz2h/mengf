import { combineReducers } from "redux";
import { userActions } from "./action";

const initState = {
  selectedCourses: {
    fall: {},
    winter: {},
    summer: {},
  },
  fallCalendar: {
    Mon: {},
    Tue: {},
    Wed: {},
    Thu: {},
    Fri: {},
  },
  winterCalendar: { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {} },
  summerCalendar: { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {} },
  curDisplay: "",
};

function addSectionToCourses(myCourses, code, detail) {
  if (code in myCourses) {
    // Avoid adding duplicate sections to a course
    for (let section in myCourses[code]) {
      if (section.type === detail.type) {
        console.log(`!!! Reducer already added ${code} ${detail.type}`);
        return;
      }
    }
    let courseSchedule = myCourses[code];
    courseSchedule[detail.type] = detail.time;
  } else {
    // Have not added before
    myCourses[code] = {};
    myCourses[code][detail.type] = detail.time;
  }
  return myCourses;
}

function parseTime(time) {
  if (/\d{1,2}:\d{2}/.test(time)) {
    console.log(`${time} should be parsed`);
    let [hour, minute] = time.split(":");
    return `${hour}.${minute / 60}`;
  }
  return time;
}

function addSectionToCalendar(state, code, detail) {
  for (let day in detail.time) {
    let detailAddedToCalendar = {};
    detailAddedToCalendar.key = `${code} ${detail.type}`;
    for (let i in state[day]) {
      if (state[day][i].key === detailAddedToCalendar.key) {
        console.log(`${state[day][i].key} added already`);
        break;
      }
    }
    detailAddedToCalendar.start = parseTime(detail.time[day].start);
    detailAddedToCalendar.end = parseTime(detail.time[day].end);
    state[day][`${code}${detail.type}`] = detailAddedToCalendar;
  }
  return Object.assign({}, state);
}

function deleteSectionFromCourses(myCourses, code, detail) {
  if (!code in myCourses) {
    console.log(`!!! Reducer ${code} not in myCourses`);
  } else {
    let myFilteredSection = [];
    for (let section in myCourses[code]) {
      if (section !== detail.type) {
        myFilteredSection.push(section);
      }
    }
    if (myFilteredSection.length == 0) {
      delete myCourses[code];
    } else {
      delete myCourses[code][detail.type];
    }
  }
  return myCourses;
}

function deleteSectionFromCalendar(state, code, detail) {
  let sectionKey = `${code}${detail.type}`;
  for (let day in detail.time) {
    delete state[day][sectionKey];
  }
  return Object.assign({}, state);
}

function addSection(state, code, semester, detail) {
  switch (semester) {
    case "F":
      state.selectedCourses.fall = addSectionToCourses(
        state.selectedCourses.fall,
        code,
        detail
      );
      state.fallCalendar = addSectionToCalendar(
        state.fallCalendar,
        code,
        detail
      );
      return Object.assign({}, state);

    case "W":
      state.selectedCourses.winter = addSectionToCourses(
        state.selectedCourses.winter,
        code,
        detail
      );
      state.winterCalendar = addSectionToCalendar(
        state.winterCalendar,
        code,
        detail
      );

      return Object.assign({}, state);

    case "S":
      state.selectedCourses.summer = addSectionToCourses(
        state.selectedCourses.summer,
        code,
        detail
      );
      state.summerCalendar = addSectionToCalendar(
        state.summerCalendar,
        code,
        detail
      );

      return Object.assign({}, state);

    default:
      return Object.assign({}, state);
  }
}

function deleteSection(state, code, semester, detail) {
  switch (semester) {
    case "F":
      state.selectedCourses.fall = deleteSectionFromCourses(
        state.selectedCourses.fall,
        code,
        detail
      );
      state.fallCalendar = deleteSectionFromCalendar(
        state.fallCalendar,
        code,
        detail
      );
      return Object.assign({}, state);

    case "W":
      state.selectedCourses.winter = deleteSectionFromCourses(
        state.selectedCourses.winter,
        code,
        detail
      );
      state.winterCalendar = deleteSectionFromCalendar(
        state.winterCalendar,
        code,
        detail
      );
      return Object.assign({}, state);

    case "S":
      state.selectedCourses.summer = deleteSectionFromCourses(
        state.selectedCourses.summer,
        code,
        detail
      );
      state.summerCalendar = deleteSectionFromCalendar(
        state.summerCalendar,
        code,
        detail
      );
      return Object.assign({}, state);
    default:
      console.log(`!!! Reducer : semester unknown${semester}`);
      return Object.assign({}, state);
  }
}

function courseReducer(state = initState, action) {
  switch (action.type) {
    case userActions.ADD_SECTION:
      console.log("ADD_SECTION");
      return addSection(state, action.code, action.semester, action.detail);
    case userActions.DELETE_SECTION:
      console.log("DELETE_SECTION");
      return deleteSection(state, action.code, action.semester, action.detail);
    case userActions.SET_DISPLAYED:
      console.log("SET_SECTION");
      return Object.assign({}, state, { curDisplay: action.code });
    default:
      return Object.assign({}, state);
  }
}

const rootReducer = combineReducers({
  courseReducer,
});

export default rootReducer;
