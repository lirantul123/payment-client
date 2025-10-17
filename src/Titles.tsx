import React from "react";

const Titles: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "30px",
    width: "100%",
    textAlign: "center",
    marginLeft: "-200px",
    marginTop: "30px",
    pointerEvents: "none",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#888",
    margin: 0,
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <div style={footerStyle}>
      <h1 style={textStyle}>We only use mastercard payment because they are the only one who wouldnt dare support the Regime</h1>
      <h1 style={textStyle}>Created and designed by @anaonimuse</h1>
    </div>
  );
};

export default Titles;
