let sample = [
  {
    key: "2",
    start: "10",
    end: "12",
  },
  {
    key: "1",
    start: "9",
    end: "13",
  },

  {
    key: "4",
    start: "15",
    end: "17",
  },
  {
    key: "3",
    start: "12",
    end: "13",
  },
];

function hasConflict(c1, c2) {
  return !(
    Number(c1.end) <= Number(c2.start) || Number(c1.start) >= Number(c2.end)
  );
}

/**
 Given all courses at a given date, get the number of processors(number of conflicts)
 and return all processors containing courses.
 @param {Array} courses: list of {key, start, end} 
 @returns : [[{course}]...]
 */
export function getNumProcessor(courses) {
  courses.sort((k1, k2) => {
    let s1 = Number(k1.start);
    let s2 = Number(k2.start);
    return s1 - s2;
  });
  let res = new Array();
  for (let i = 0; i < courses.length; i++) {
    let curCourse = courses[i];
    let appended = false;
    // Find first fit
    for (let j = 0; j < res.length; j++) {
      let processor = res[j];
      if (
        processor.length === 0 ||
        !hasConflict(processor[processor.length - 1], curCourse)
      ) {
        processor.push(curCourse);
        appended = true;
        break;
      }
    }
    // Add a new processor if there is no available processor
    if (!appended) {
      let newP = new Array();
      newP.push(curCourse);
      res.push(newP);
    }
  }
  return res;
}
