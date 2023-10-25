import { useEffect, useState, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactHowler from "react-howler";
import { library } from "@fortawesome/fontawesome-svg-core";
import gameMusic from "./assets/professor.mp3";
import * as icons from "./icon";
import Homepage from "./pages/homepage";
import GamePage from "./pages/GamePage";
library.add(...Object.values(icons));

const initialState = {
  status: "ready",
  cards: [],
  allCards: [],
  score: 0,
  maxScore: null,
  highscore: 0,
  result: null,
  errorMsg: "",
};

const MAX_POKEMON_DATA = 150;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, allCards: action.payload, status: "ready" };
    case "levelReceived":
      let scoreRange;
      if (action.payload === "easy") scoreRange = 5;
      if (action.payload === "medium") scoreRange = 10;
      if (action.payload === "hard") scoreRange = 15;

      function randomNumber() {
        return Math.floor(Math.random() * MAX_POKEMON_DATA);
      }

      const getNumArr = Array(scoreRange)
        .fill(0)
        .reduce((acc, cur) => {
          cur = randomNumber();

          while (acc.includes(cur)) cur = randomNumber();

          return [...acc, cur];
        }, []);

      const getCardArr = getNumArr.map((num) => state.allCards[num]);

      return {
        ...state,
        status: "loading",
        maxScore: scoreRange,
        cards: getCardArr,
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
    { status, cards, score, maxScore, highscore, result, errorMsg },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [setting, setSetting] = useState({
    music: true,
    sound: true,
  });

  const defaultProps = {
    setting,
    onSetting: setSetting,
    dispatch,
  };

  useEffect(function () {
    async function fetchPokemon() {
      try {
        dispatch({ type: "failedFetching", payload: "" });

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON_DATA + 1}`
        );
        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching all Pokemon data"
          );

        const data = await res.json();

        async function fetchDataPokemon(name, url) {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Pokemon data not found");

          const data = await res.json();
          return { name, img: data.sprites.front_default };
        }

        const dataPokemon = await Promise.all(
          data.results.map((pokemon) =>
            fetchDataPokemon(pokemon.name, pokemon.url)
          )
        );

        dispatch({ type: "dataReceived", payload: dataPokemon });
      } catch (err) {
        dispatch({ type: "failedFetching", payload: err });
        console.error(err);
      }
    }
    fetchPokemon();
  }, []);

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
