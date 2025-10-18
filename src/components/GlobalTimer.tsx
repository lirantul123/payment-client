import React, { useEffect, useState } from "react";

const GlobalTimer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timeSince, setTimeSince] = useState<string>("");

  useEffect(() => {
    const targetDate = new Date("2023-10-07T00:00:00Z"); // Oct 7, 2023 UTC

    const updateTimes = () => {
      const now = new Date();

      // Current global time (UTC)
      const utcHours = now.getUTCHours().toString().padStart(2, "0");
      const utcMinutes = now.getUTCMinutes().toString().padStart(2, "0");
      const utcSeconds = now.getUTCSeconds().toString().padStart(2, "0");
      setCurrentTime(`${utcHours}:${utcMinutes}:${utcSeconds} UTC`);

      // Time since Oct 7, 2023
      const diff = now.getTime() - targetDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeSince(`${days}d ${hours}h ${minutes}m ${seconds}s since Oct 7, 2023`);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#1f1f1f",
        borderBottom: "2px solid #ffcc00",
        padding: "0.8rem 0",
        textAlign: "center",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        boxShadow: "0 2px 10px rgba(255, 204, 0, 0.3)",
        zIndex: 9999,
      }}
    >
      <h2 style={{ margin: 0, fontWeight: 700, color: "#00ff7f", fontSize: "1rem" }}>
        🌐 Global Clock
      </h2>
      <p style={{ margin: "2px 0", fontWeight: 600 }}>{currentTime}</p>
      <p style={{ margin: 0, fontWeight: 600, color: "#ff4d4f" }}>{timeSince}</p>
    </div>
  );
};

export default GlobalTimer;
