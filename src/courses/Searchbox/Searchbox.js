import React, { useState } from "react";
import PopupBox from "./PopupBox";

import axios from "axios";

import { Input } from "antd";

const { Search } = Input;
function fetchData(apiEndPoint, param1, param2 = "", updateResult) {
  let endPoint = param2
    ? `${apiEndPoint}/${param1}/${param2}`
    : `${apiEndPoint}/${param1}`;
  axios
    .get(endPoint)
    .then((res) => {
      updateResult(res.data.Items);
    })
    .catch((err) => {
      console.error("catch error", err);
    });
}

const Searchbox = ({
  addCourseToMySchedule,
  CoursesMatchedListAPI,
  CourseDetailAPI,
}) => {
  const searchPermitted = new RegExp("^((ECE)|(CSC)|(ece))_*.*$");
  // whether to display the search result.
  const [displayed, setdisplayed] = useState(false);
  // list of search results
  const [searchResult, setResult] = useState([]);

  // List of search results.
  let popUpContent = searchResult.map((val, index) => {
    return (
      <div
        key={index}
        className="searchResult"
        onClick={(e) => {
          //lower case id
          fetchData(CourseDetailAPI, val.id, "", (courseDetail) => {
            addCourseToMySchedule(courseDetail);
          });
          // and then update the result
        }}
      >{`${val.department} ${val.course_code}`}</div>
    );
  });
  if (searchResult.length == 0) {
    popUpContent = <div className="searchResult">No Results</div>;
  }
  return (
    <div>
      {/* Search input box  */}
      <Search
        onSearch={(userInput) => {
          let [dept, code = ""] = userInput.split(/\s+/);
          fetchData(
            CoursesMatchedListAPI,
            dept.toUpperCase(),
            code.toUpperCase(),
            (res) => {
              setResult(res);
            }
          );
        }}
        onClick={() => setdisplayed(true)}
      />
      <PopupBox
        content={popUpContent}
        display={displayed}
        setDisplay={setdisplayed}
      />
    </div>
  );
};

export default Searchbox;
