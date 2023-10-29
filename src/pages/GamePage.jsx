import { Link } from "react-router-dom";
import styles from "../styles/GamePage.module.css";
import logo from "../assets/logo.svg";
import Footer from "../components/Footer";
import Scores from "../components/Scores";
import CardList from "../components/CardList";
import Loading from "../components/Loading";
import GameResult from "../components/GameResult";

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
        />
      )}
    </main>
  );
}

export default GamePage;
