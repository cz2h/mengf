import React, { useState } from "react";
import { API as ENDPOINT } from "../endPoint";

import Searchbox from "../commonComponents/Searchbox";

const AddProgram = ({ selectedCourses, selectedPrograms, addNewProgram }) => {
  console.log("UPDATED", selectedCourses);
  return (
    <Searchbox
      updateParentState={(newProgram) => {
        //Avoid adding duplicate programs
        let programKey = `${newProgram.Department}${newProgram.Program}`;
        if (programKey in selectedPrograms) {
          return;
        }
        addNewProgram(newProgram);
      }}
      apiEndPoint={`${ENDPOINT}/programs/detail`}
    />
  );
};

export default AddProgram;
