import React from "react";

const colors = ["#ff4d4f", "#52c41a", "#ffffff"];

const Welcome: React.FC = () => {
  const text = "You may pay as much as you can to support the cause";
  const words = text.split(" ");

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: 600,
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {words.map((word, index) => (
          <span key={index} style={{ color: colors[index % colors.length], marginRight: "6px" }}>
            {word}
          </span>
        ))}
        <img src="./../../fuckpalestinIcon.png" alt="card icon" style={{ width: "28px", height: "28px" }} />
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </h1>
    </>
  );
};

export default Welcome;
