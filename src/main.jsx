import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GameProvider } from "./contexts/GameContext.jsx";
import { SettingProvider } from "./contexts/SettingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SettingProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </SettingProvider>
  </React.StrictMode>
);
