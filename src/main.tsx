import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Welcome from "./Welcome.tsx";
import Titles from "./Titles.tsx";
import GlobalTimer from "./components/GlobalTimer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalTimer />
    <div style={{ marginTop: "10px" }}>
      <Welcome />
      <App />
    </div>
    <Titles />

  </StrictMode>
);
