import { HashRouter, Routes, Route } from "react-router-dom";
import ReactHowler from "react-howler";
import { useSetting } from "./contexts/SettingContext";
import { useGame } from "./contexts/GameContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import gameMusic from "./assets/professor.mp3";
import winMusic from "./assets/gotcha.mp3";
import * as icons from "./icon";
import Homepage from "./pages/Homepage";
import GamePage from "./pages/GamePage";
library.add(...Object.values(icons));

function App() {
  const { result } = useGame();
  const { setting } = useSetting();

  return (
    <div className="app">
      <ReactHowler
        src={result === "win" ? winMusic : gameMusic}
        loop={true}
        playing={setting.music}
      />
      <HashRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="game" element={<GamePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
