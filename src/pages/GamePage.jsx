import { Link } from "react-router-dom";
import styles from "../styles/GamePage.module.css";
import logo from "../assets/logo.svg";
import Footer from "../components/Footer";
import Scores from "../components/Scores";
import CardList from "../components/CardList";
import Loading from "../components/Loading";
import GameResult from "../components/GameResult";
import Error from "../components/Error";

function GamePage({
  setting,
  onSetting,
  dispatch,
  status,
  level,
  cards,
  score,
  maxScore,
  highscore,
  result,
  errorMsg,
}) {
  return (
    <main className={styles.gamePage}>
      {status === "loading" && <Loading />}
      {status === "error" && <Error errorMsg={errorMsg} />}
      {(status === "ready" || status === "finished") && (
        <>
          <Link to="/">
            <img
              src={logo}
              alt="Pokemon Logo"
              onClick={() => dispatch({ type: "restart" })}
            />
          </Link>
          <main>
            <Scores score={score} maxScore={maxScore} highscore={highscore} />
            <CardList
              cards={cards}
              dispatch={dispatch}
              sound={setting.sound}
              status={status}
            />
          </main>
          <Footer setting={setting} onSetting={onSetting} />
        </>
      )}
      {status === "finished" && (
        <GameResult
          result={result}
          score={score}
          dispatch={dispatch}
          level={level}
          sound={setting.sound}
        />
      )}
    </main>
  );
}

export default GamePage;
