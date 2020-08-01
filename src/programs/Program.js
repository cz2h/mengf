import React, { useState } from "react";
import { connect } from "react-redux";

import { Card } from "antd";

import AllPrograms from "./AllPrograms";
import ProgramDetails from "./ProgramDetails";
import AddProgram from "./AddProgram";

import { updateAllProgramProgress } from "./programHelperFunctions";

const tabList = [
  {
    key: "tab1",
    tab: "All",
  },
  {
    key: "tab2",
    tab: "Details",
  },
];

const Program = (props) => {
  // UI state
  const [curTab, setCurTab] = useState({ t: "tab1" });
  const [displayedProgram, setDisplayedProgram] = useState(0);
  // User data state
  const [selectedPrograms, setSelectedProgram] = useState({});

  console.log("In Program", selectedPrograms, displayedProgram);
  const contentList = {
    tab1: (
      <AllPrograms
        programs={selectedPrograms}
        onClick={(name) => {
          console.log(name);
          setDisplayedProgram(name);
          setCurTab({ t: "tab2" });
        }}
        onDelete={(name) => {
          let { [name]: content, ...rest } = selectedPrograms;
          setSelectedProgram(rest);
        }}
      />
    ),
    tab2: (
      <ProgramDetails
        program={
          displayedProgram
            ? updateAllProgramProgress(
                selectedPrograms[displayedProgram],
                props.selectedCourses
              )[displayedProgram]
            : ""
        }
      />
    ),
  };
  return (
    <div>
      <Card
        title={"My Programs"}
        tabList={tabList}
        activeTabKey={curTab.t}
        onTabChange={(key) => {
          setCurTab({ t: key });
        }}
      >
        <AddProgram
          selectedCourses={props.selectedCourses}
          selectedPrograms={selectedPrograms}
          addNewProgram={(newProgram) => {
            setSelectedProgram({
              ...selectedPrograms,
              [`${newProgram.Department}${newProgram.Program}`]: newProgram,
            });
          }}
        />
        {contentList[curTab.t]}
      </Card>
    </div>
  );
};

function parseToList(selectedCourses) {
  let res = [];
  for (let term in selectedCourses) {
    for (let course in selectedCourses[term]) {
      res.push(course);
    }
  }
  return res;
}

const mapState = (state) => {
  return { selectedCourses: parseToList(state.courseReducer.selectedCourses) };
};

const ConnectedProgram = connect(mapState)(Program);
export default ConnectedProgram;
