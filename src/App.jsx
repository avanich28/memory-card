import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sound from "react-sound";
import ReactHowler from "react-howler";
import gameMusic from "./assets/professor.mp3";
import * as icons from "./icon";
import Homepage from "./pages/homepage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
library.add(...Object.values(icons));

function App() {
  const [setting, setSetting] = useState({
    music: true,
    sound: true,
  });

  const defaultProps = {
    setting,
    onSetting: setSetting,
  };

  return (
    <div className="app">
      <ReactHowler src={gameMusic} loop={true} playing={setting.music} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage {...defaultProps} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
