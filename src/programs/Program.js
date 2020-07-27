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

// const selectedProgram = [
//   {
//     Department: "TEST",
//     Program: "MENG 1",
//     CoursesRequired: 4,
//     CreditFullfilled: 3,
//     completed: true,
//     OtherRequirements: [
//       {
//         Title: "Test Title",
//         Category: "^ECE5\\d{2}$",
//         limitation: "2 -",
//         Description: "You can have at most 2 500 level ECE courses.",
//         progress: {
//           completed: false,
//           usedCourses: (
//             <div>
//               <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
//             </div>
//           ),
//         },
//       },
//     ],
//   },
//   {
//     Department: "TEST",
//     Program: "MENG 2",
//     CoursesRequired: 9,
//     CreditFullfilled: 5,
//     completed: false,
//     OtherRequirements: [
//       {
//         Title: "Test Title",
//         Category: "^ECE5\\d{2}$",
//         limitation: "2 -",
//         Description: "You can have at most 2 500 level ECE courses.",
//         progress: {
//           completed: false,
//           usedCourses: (
//             <div>
//               <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
//             </div>
//           ),
//         },
//       },
//       {
//         Title: "Test Title 2",
//         Category: "^ECE5(5\\d{2}|1\\d{3})$",
//         limitation: "5 +",
//         Description: "You need to have at least 5 ECE courses.",
//         progress: {
//           completed: false,
//           usedCourses: (
//             <div>
//               <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
//             </div>
//           ),
//         },
//       },
//       {
//         Title: "Test Title 3",
//         Category: "^(ECE)|(CSC)\\d{3, 4}$",
//         limitation: "6 +",
//         Description: "You need to have at least 6 technical courses.",
//         progress: {
//           completed: false,
//           usedCourses: (
//             <div>
//               <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
//             </div>
//           ),
//         },
//       },
//     ],
//   },
// ];

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
        onClick={(index) => {
          setDisplayedProgram(index);
          setCurTab({ t: "tab2" });
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
