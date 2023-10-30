import { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactHowler from "react-howler";
import { library } from "@fortawesome/fontawesome-svg-core";
import gameMusic from "./assets/professor.mp3";
import * as icons from "./icon";
import usePokemon from "./hooks/usePokemon.js";
import Homepage from "./pages/homepage";
import GamePage from "./pages/GamePage";
import useLocaleStorageState from "./hooks/useLocaleStorageState";
library.add(...Object.values(icons));

// readme

const initialState = {
  status: "loading",
  level: null,
  idArr: [],
  cards: [],
  answer: [],
  score: 0,
  maxScore: null,
  highscore: 0,
  result: null,
  errorMsg: "",
};

const initialSetting = {
  music: true,
  sound: true,
};

const MAX_POKEMON_DATA = 800;

function reducer(state, action) {
  switch (action.type) {
    case "highscoreReceived":
      return { ...state, highscore: action.payload };
    case "levelReceived":
      let scoreRange;
      if (action.payload === "easy") scoreRange = 5;
      if (action.payload === "medium") scoreRange = 8;
      if (action.payload === "hard") scoreRange = 12;

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

      return {
        ...state,
        status: "loading",
        level: action.payload,
        maxScore: scoreRange,
        idArr,
      };
    case "dataReceived":
      return { ...state, cards: action.payload, status: "ready" };
    case "checkAnswer":
      const getHighScore = state.highscore > state.score;

      if (state.answer.includes(action.payload))
        return {
          ...state,
          result: "lose",
          status: "finished",
          highscore: getHighScore ? state.highscore : state.score,
        };

      if (state.answer.length === state.maxScore - 1)
        return {
          ...state,
          score: state.score++,
          result: "win",
          status: "finished",
          highscore: getHighScore ? state.highscore : state.score++,
        };

      return {
        ...state,
        answer: [...state.answer, action.payload],
        score: state.score++,
      };
    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
      };
    case "failedFetching":
      return { ...state, status: "error", errorMsg: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    {
      status,
      level,
      cards,
      idArr,
      score,
      maxScore,
      highscore,
      result,
      errorMsg,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [setting, setSetting] = useLocaleStorageState(
    initialSetting,
    "setting"
  );
  usePokemon(idArr, dispatch); // cards

  useEffect(
    function () {
      const storedHighscore = localStorage.getItem("highscore");

      dispatch({
        type: "highscoreReceived",
        payload: JSON.parse(storedHighscore),
      });
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (highscore === 0) return;

      localStorage.setItem("highscore", JSON.stringify(highscore));
    },
    [highscore]
  );

  const defaultProps = {
    setting,
    onSetting: setSetting,
    dispatch,
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
                level={level}
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
