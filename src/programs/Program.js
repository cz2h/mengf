import React, { useState } from "react";
import { connect } from "react-redux";

import { Card } from "antd";

import AllPrograms from "./AllPrograms";
import ProgramDetails from "./ProgramDetails";
import AddProgram from "./AddProgram";

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

  const contentList = {
    tab1: (
      // TODO : ADD DELETE
      <AllPrograms
        programs={selectedPrograms}
        onClick={(name) => {
          setDisplayedProgram(name);
          setCurTab({ t: "tab2" });
        }}
        onDelete={(name) => {
          console.log(name);
          let { [name]: content, ...rest } = selectedPrograms;
          setSelectedProgram(rest);
          console.log(selectedPrograms);
        }}
      />
    ),
    tab2: <ProgramDetails program={selectedPrograms[displayedProgram]} />,
  };
  return (
    <div>
      {/* search bar to search and add program */}

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
          setSelectedPrograms={(newState) => setSelectedProgram(newState)}
        />
        {contentList[curTab.t]}
      </Card>
    </div>
  );
};

const mapState = (state) => {
  return { selectedCourses: state.courseReducer.selectedCourses };
};

const actionCreators = {};

const ConnectedProgram = connect(mapState, actionCreators)(Program);
export default ConnectedProgram;
