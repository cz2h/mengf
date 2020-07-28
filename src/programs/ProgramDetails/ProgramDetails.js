import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const ProgramDetails = ({ program }) => {
  if (!program) return <div>No courses selected yet </div>;
  const programTitleStyle = { float: "left", fontWeight: 700 };
  const creditStyle = { float: "right" };
  const titleStyle = { fontWeight: 700 };

  const requirementsCard = program.OtherRequirements.map(
    (requirement, index) => {
      let headerStyle = requirement.progress.completed
        ? { color: "green" }
        : { color: "red" };

      return (
        <Panel
          header={<span style={headerStyle}>{requirement.Title}</span>}
          key={index}
        >
          <h3> Description: </h3>
          <p>{requirement.Description}</p>
          <h3>Matched Courses</h3>
          <div>{requirement.progress.usedCourses}</div>
        </Panel>
      );
    }
  );

  return (
    <div>
      <div style={titleStyle}>{`${program.Department} ${program.Program}`}</div>

      <Collapse>{requirementsCard}</Collapse>
    </div>
  );
};

export default ProgramDetails;
