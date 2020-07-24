import React, { useState } from "react";

import { Input, Card } from "antd";

import AllPrograms from "./AllPrograms";
import ProgramDetails from "./ProgramDetails";

const { Search } = Input;

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

const takenCourse = ["ECE 1000", "ECE 1200", "ECE 1300"];
const testData = [
  {
    Department: "TEST",
    Program: "MENG 1",
    CoursesRequired: 4,
    CreditFullfilled: 3,
    completed: true,
    OtherRequirements: [
      {
        Title: "Test Title",
        Category: "^ECE5\\d{2}$",
        limitation: "2 -",
        Description: "You can have at most 2 500 level ECE courses.",
        progress: {
          completed: false,
          usedCourses: (
            <div>
              <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
            </div>
          ),
        },
      },
    ],
  },
  {
    Department: "TEST",
    Program: "MENG 2",
    CoursesRequired: 9,
    CreditFullfilled: 5,
    completed: false,
    OtherRequirements: [
      {
        Title: "Test Title",
        Category: "^ECE5\\d{2}$",
        limitation: "2 -",
        Description: "You can have at most 2 500 level ECE courses.",
        progress: {
          completed: false,
          usedCourses: (
            <div>
              <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
            </div>
          ),
        },
      },
      {
        Title: "Test Title 2",
        Category: "^ECE5(5\\d{2}|1\\d{3})$",
        limitation: "5 +",
        Description: "You need to have at least 5 ECE courses.",
        progress: {
          completed: false,
          usedCourses: (
            <div>
              <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
            </div>
          ),
        },
      },
      {
        Title: "Test Title 3",
        Category: "^(ECE)|(CSC)\\d{3, 4}$",
        limitation: "6 +",
        Description: "You need to have at least 6 technical courses.",
        progress: {
          completed: false,
          usedCourses: (
            <div>
              <span>ECE 500</span> <span>ECE 501</span> <span>ECE 502</span>
            </div>
          ),
        },
      },
    ],
  },
];

const Program = ({}) => {
  const [curTab, setCurTab] = useState({ t: "tab1" });
  const [displayedProgram, setDisplayedProgram] = useState(0);
  const contentList = {
    tab1: (
      <AllPrograms
        programs={testData}
        onClick={(index) => {
          setDisplayedProgram(index);
          setCurTab({ t: "tab2" });
        }}
      />
    ),
    tab2: <ProgramDetails program={testData[displayedProgram]} />,
  };

  return (
    <div>
      <Search placeholder={"e.g ECE MENG"} size={"large"} />
      <Card
        title={"My Programs"}
        tabList={tabList}
        activeTabKey={curTab.t}
        onTabChange={(key) => {
          setCurTab({ t: key });
        }}
      >
        {contentList[curTab.t]}
      </Card>
    </div>
  );
};

export default Program;
