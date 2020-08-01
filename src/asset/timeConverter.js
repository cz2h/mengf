/**
 *
 * @param {*} time :"\d{1,2}:?\d{1,2}(am||pm)"
 * @returns {Number} res:"\d{1,2}"
 */
export function parseTimeString(time) {
  if (/.*:.*pm/.test(time)) {
    let [pureTime] = time.split("pm");
    let [hour, min] = pureTime.split(":");
    if (hour === "12") {
      return `${Number(hour)}.${Number(min) / 6}`;
    } else {
      return `${Number(hour) + 12}.${Number(min) / 6}`;
    }
  } else if (/.*pm/.test(time)) {
    let [pureTime] = time.split("pm");
    if (pureTime === "12") {
      return `${Number(pureTime)}`;
    } else {
      return `${Number(pureTime) + 12}`;
    }
  } else if (/.*:.*am/.test(time)) {
    let [pureTime] = time.split("am");
    let [hour, min] = pureTime.split(":");
    return `${Number(hour)}.${Number(min) / 6}`;
  } else if (/.*am/.test(time)) {
    let [pureTime] = time.split("am");
    return `${Number(pureTime)}`;
  }
}

// Testing
// console.log(parseTimeString("7am"));
// console.log(parseTimeString("7:30am"));
// console.log(parseTimeString("12pm"));
// console.log(parseTimeString("12:30pm"));
// console.log(parseTimeString("10pm"));
// console.log(parseTimeString("10:30pm"));
