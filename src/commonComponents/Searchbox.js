import React, { useState } from "react";

import axios from "axios";

import { Select, Input } from "antd";

const { Option } = Select;
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

  const [displayed, setdisplayed] = useState("");
  const [searchResult, setResult] = useState([]);

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
          setdisplayed(userInput);
        }}
      />
      <Select
        showSearch
        value={displayed}
        style={{ width: "80%", maxHeight: "0%" }}
        showArrow={false}
        onSearch={(userInput) => {
          if (!searchPermitted.test(userInput)) {
            console.log(`${userInput} is not a valid search pattern`);
            return;
          }
          let [param1, param2] = userInput.split(/_+/);
          fetchData(apiEndPoint, param1, param2, setResult);
          setdisplayed(userInput);
        }}
        onChange={(index) => {
          console.log("on change");
          updateParentState(searchResult[index]);
        }}
        notFoundContent={null}
      >
        {searchResult.map((p, i) => {
          console.log("options updated");
          return <Option key={i}>{`${p.Department} ${p.Program}`}</Option>;
        })}
      </Select>
    </div>
  );
};

export default Searchbox;
