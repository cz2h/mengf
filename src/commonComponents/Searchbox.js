import React, { useState } from "react";
import PopupBox from "./PopupBox";

import axios from "axios";

import { Input } from "antd";

const { Search } = Input;
function fetchData(apiEndPoint, param1, param2 = "", updateResult) {
  axios
    .get(`${apiEndPoint}/${param1}/${param2}`)
    .then((res) => {
      console.log("success");
      updateResult(res.data.Items);
    })
    .catch((err) => {
      console.error("catch error", err);
    });
}

const Searchbox = ({ updateParentState, apiEndPoint }) => {
  const searchPermitted = new RegExp("^((ECE)|(CSC)|(ece))_*.*$");

  const [displayed, setdisplayed] = useState(false);
  const [searchResult, setResult] = useState([]);
  const popUpContent = searchResult.map((val, index) => {
    return (
      <div
        key={index}
        className="searchResult"
        onClick={(val) => {
          console.log(val);
          updateParentState(searchResult[index]);
          setdisplayed(false);
        }}
      >{`${val.Department} ${val.Program}`}</div>
    );
  });
  return (
    <div>
      <Search
        onSearch={(userInput) => {
          if (!searchPermitted.test(userInput)) {
            console.log(`${userInput} is not a valid search pattern`);
            return;
          }
          let [param1, param2] = userInput.split(/_+/);
          fetchData(apiEndPoint, param1, param2, setResult);
          setdisplayed(true);
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
