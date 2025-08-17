import React from "react";

const TechBadge = ({ label }) => (
  <span style={{
    display: "inline-block",
    padding: "0.3rem 0.6rem",
    margin: "0.2rem",
    backgroundColor: "#e0e0e0",
    borderRadius: "12px",
    fontSize: "0.8rem",
    color: "#333"
  }}>
    {label}
  </span>
);

export default TechBadge;
