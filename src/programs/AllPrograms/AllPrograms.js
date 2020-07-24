import React, { useState } from "react";
import { Card } from "antd";

const AllPrograms = ({ programs, onClick }) => {
  const cardStyle = { marginTop: "16px", width: "90%", cursor: "pointer" };
  const programNameStyle = { fontSize: "16px", fontWeight: 700 };
  const myPrograms = programs.map((program, index) => {
    return (
      // will be replaced in later days
      <Card.Grid
        key={index}
        onClick={(e) => onClick(index)}
        style={cardStyle}
        hoverable={true}
      >
        <span
          style={programNameStyle}
        >{`${program.Department} ${program.Program}`}</span>
        <span style={{ float: "right" }}>
          <span style={{ color: program.completed ? "green" : "red" }}>
            {program.completed ? "full filled" : "in progress"}
          </span>
        </span>
      </Card.Grid>
    );
  });
  return <div>{myPrograms}</div>;
};
export default AllPrograms;
