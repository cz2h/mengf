import React, { useState } from "react";
import { API as ENDPOINT } from "../endPoint";

import Searchbox from "../commonComponents/Searchbox";

let testData = [
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
      },
      {
        Title: "Test Title 2",
        Category: "^ECE(5\\d{2}|1\\d{3})$",
        limitation: "5 +",
        Description: "You need to have at least 5 ECE courses.",
      },
      {
        Title: "Test Title 3",
        Category: "^(ECE)|(CSC)\\d{3, 4}$",
        limitation: "6 +",
        Description: "You need to have at least 6 technical courses.",
      },
    ],
  },
];

function updateProgress(requirements, selectedCourses) {
  let completed = true;
  for (let i = 0; i < requirements.length; i++) {
    let requirement = requirements[i];
    let [numCourses, limitation] = requirement.limitation.split(" ");
    if (!numCourses || !limitation) {
      console.error(
        `${requirement.Title}.limitation is ${requirement.limitation}`
      );
    }

    let requiredCategory = new RegExp(requirement.Category);
    let counter = 0;
    const satisfiedCourses = new Array();

    for (let i = 0; i < selectedCourses.length; i++) {
      console.log(
        selectedCourses[i],
        requiredCategory.test(selectedCourses[i])
      );
      if (requiredCategory.test(selectedCourses[i])) {
        counter += 1;
        satisfiedCourses.push(selectedCourses[i]);
        console.log(satisfiedCourses);
      }
    }
    if (limitation === "+") {
      // want at least numCourses
      requirement.progress = {
        completed: counter >= numCourses,
        usedCourses: satisfiedCourses,
      };
    } else if (limitation === "-") {
      requirement.progress = {
        completed: counter <= numCourses,
        usedCourses: satisfiedCourses,
      };
    }
    if (!requirement.completed) completed = false;
  }
  console.log(requirements);
  return [requirements, completed];
}

function updateAllProgramProgress(selectedProgram, selectedCourses) {
  // for all selected programs
  let program = selectedProgram;
  // update the if all requirements are completed
  let [udpatedRequirements, allSatisfied] = updateProgress(
    program.OtherRequirements,
    selectedCourses
  );
  program.OtherRequirements = udpatedRequirements;
  program.completed = allSatisfied;
  let key = `${selectedProgram.Department}${selectedProgram.Program}`;
  return { [`${key}`]: selectedProgram };
}

const AddProgram = ({
  selectedCourses,
  selectedPrograms,
  setSelectedPrograms,
}) => {
  return (
    <Searchbox
      updateParentState={(newProgram) => {
        //Avoid adding duplicate programs
        let programKey = `${newProgram.Department}${newProgram.Program}`;
        if (programKey in selectedPrograms) {
          console.log("Added before");
          return;
        }
        const udpatedProgram = updateAllProgramProgress(
          newProgram,
          selectedCourses
        );
        setSelectedPrograms({ ...selectedPrograms, ...udpatedProgram });
      }}
      apiEndPoint={`${ENDPOINT}/programs/detail`}
    />
  );
};

export default AddProgram;
