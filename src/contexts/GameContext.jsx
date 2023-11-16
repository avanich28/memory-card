import { createContext, useContext, useEffect, useReducer } from "react";

const MAX_POKEMON_DATA = 800;

const GameContext = createContext();

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

function randomNumber() {
  return Math.floor(Math.random() * MAX_POKEMON_DATA);
}

function reducer(state, action) {
  switch (action.type) {
    case "highscoreReceived":
      return { ...state, highscore: action.payload };
    case "levelReceived":
      let scoreRange;
      if (action.payload === "easy") scoreRange = 5;
      if (action.payload === "medium") scoreRange = 8;
      if (action.payload === "hard") scoreRange = 12;

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
          highscore: state.answer.length + 1,
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

function GameProvider({ children }) {
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

  useEffect(
    function () {
      const storedHighscore = localStorage.getItem("highscore");

      dispatch({
        type: "highscoreReceived",
        payload:
          JSON.parse(storedHighscore) === null
            ? 0
            : JSON.parse(storedHighscore),
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

  useEffect(
    function () {
      if (!idArr.length) return;
      async function fetchPokemon(id) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

          if (!res.ok)
            throw new Error(`Pokemon data not found (${res.status})`);

          const data = await res.json();

          return { name: data.name, img: data.sprites.front_default };
        } catch (err) {
          dispatch({ type: "failedFetching", payload: err.message });
          console.error(err);
        }
      }

      const dataArr = idArr.map((id) => fetchPokemon(id));

      Promise.all(dataArr).then((data) =>
        data.every((obj) => obj !== undefined)
          ? dispatch({ type: "dataReceived", payload: data })
          : []
      );
    },
    [JSON.stringify(idArr), dispatch]
  );

  function getLevel(level) {
    dispatch({ type: "levelReceived", payload: level });
  }

  return (
    <GameContext.Provider
      value={{
        status,
        level,
        cards,
        idArr,
        score,
        maxScore,
        highscore,
        result,
        errorMsg,
        dispatch,
        getLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext was used outside the GameProvider");
  return context;
}

export { GameProvider, useGame };
