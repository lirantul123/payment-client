import React from "react";

const Titles: React.FC = () => {
  const footerLeftStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    textAlign: "center",
    pointerEvents: "none",
    color: "#888",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: "1rem",
    writingMode: "vertical-rl",
    letterSpacing: "2px",
  };

  const footerRightStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    textAlign: "center",
    pointerEvents: "none",
    color: "#888",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: "1rem",
    writingMode: "vertical-lr",
    letterSpacing: "10px",
  };
  return (
    <>
      <div style={footerLeftStyle}>Created and Designed by @anaonimuse</div>
    </>
  );
};

export default Titles;
