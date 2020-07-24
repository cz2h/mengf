import React, { useState } from "react";

const ProgramSummarized = ({ program, index, onClick }) => {
  const cardStyle = {};
  return (
    <div key={index} style={cardStyle} onClick={(e) => onClick(index)}></div>
  );
};

export default ProgramSummarized;
