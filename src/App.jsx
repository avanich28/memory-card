import { useState, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactHowler from "react-howler";
import { library } from "@fortawesome/fontawesome-svg-core";
import gameMusic from "./assets/professor.mp3";
import * as icons from "./icon";
import usePokemon from "./hooks/usePokemon.js";
import Homepage from "./pages/homepage";
import GamePage from "./pages/GamePage";
library.add(...Object.values(icons));

const initialState = {
  status: "loading",
  idArr: [],
  cards: [],
  score: 0,
  maxScore: null,
  highscore: 0,
  result: null,
  errorMsg: "",
};

const MAX_POKEMON_DATA = 800;

function reducer(state, action) {
  switch (action.type) {
    case "levelReceived":
      let scoreRange;
      if (action.payload === "easy") scoreRange = 5;
      if (action.payload === "medium") scoreRange = 10;
      if (action.payload === "hard") scoreRange = 15;

      function randomNumber() {
        return Math.floor(Math.random() * MAX_POKEMON_DATA);
      }

      const idArr = Array(scoreRange)
        .fill(0)
        .reduce((acc, cur) => {
          cur = randomNumber();

          while (acc.includes(cur)) cur = randomNumber();

          return [...acc, cur];
        }, []);

      // const getCardArr = idArr.map((id) => usePokemon(id));

      return {
        ...state,
        status: "loading",
        maxScore: scoreRange,
        idArr,
      };
    case "dataReceived":
      return { ...state, cards: action.payload, status: "ready" };
    case "resultReceived":
      return {
        ...state,
        result: action.payload,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
        allCards: state.allCards,
      };
    case "failedFetching":
      return { ...state, status: "error", errorMsg: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    { status, cards, idArr, score, maxScore, highscore, result, errorMsg },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [setting, setSetting] = useState({
    music: false,
    sound: true,
  });
  usePokemon(idArr, dispatch); // get cards

  const defaultProps = {
    setting,
    onSetting: setSetting,
    dispatch,
    status,
  };

  return (
    <div className="app">
      <ReactHowler src={gameMusic} loop={true} playing={setting.music} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage {...defaultProps} />} />
          <Route
            path="game"
            element={
              <GamePage
                {...defaultProps}
                status={status}
                cards={cards}
                score={score}
                maxScore={maxScore}
                highscore={highscore}
                result={result}
                errorMsg={errorMsg}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
