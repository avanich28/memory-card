import { Link } from "react-router-dom";
import styles from "../styles/GamePage.module.css";
import logo from "../assets/logo.svg";
import Footer from "../components/Footer";
import Scores from "../components/Scores";
import CardList from "../components/CardList";

function GamePage({
  setting,
  onSetting,
  dispatch,
  status,
  cards,
  score,
  maxScore,
  highscore,
  result,
  errorMsg,
}) {
  return (
    <main className={styles.gamePage}>
      <Link to="/">
        <img src={logo} alt="Pokemon Logo" />
      </Link>
      <main>
        <Scores score={score} maxScore={maxScore} highscore={highscore} />
        <CardList cards={cards} dispatch={dispatch} />
      </main>
      <Footer setting={setting} onSetting={onSetting} />
    </main>
  );
}

export default GamePage;
