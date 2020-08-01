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
      if (requiredCategory.test(selectedCourses[i])) {
        counter += 1;
        satisfiedCourses.push(selectedCourses[i]);
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
  return [requirements, completed];
}

export function updateAllProgramProgress(selectedProgram, selectedCourses) {
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
