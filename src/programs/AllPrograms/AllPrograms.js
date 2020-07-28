import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const AllPrograms = ({ programs, onClick, onDelete }) => {
  const marginStyle = { marginTop: "16px", width: "90%", cursor: "pointer" };
  const programNameStyle = { fontSize: "16px", fontWeight: 700 };

  let myPrograms = [];
  for (const programName in programs) {
    let program = programs[programName];
    myPrograms = myPrograms.concat(
      <div key={programName}>
        <Card.Grid
          onClick={(e) => {
            onClick(programName);
          }}
          style={marginStyle}
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
        <DeleteOutlined
          style={{ marginTop: "20px", marginLeft: "0.5vw" }}
          onClick={(e) => {
            onDelete(programName);
          }}
        />
      </div>
    );
  }

  return <div>{myPrograms}</div>;
};
export default AllPrograms;
