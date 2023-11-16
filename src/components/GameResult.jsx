import { Link } from "react-router-dom";
import styles from "../styles/GameResult.module.css";
import { useGame } from "../contexts/GameContext";
import pikachuDance from "../assets/pikachu-dance.gif";
import pikachuDizzy from "../assets/pikachu-dizzy.webp";
import Button from "./Button";

function GameResult() {
  const { result, score, level, dispatch, getLevel } = useGame();

  return (
    <div className={styles.gameResult}>
      <div>
        {result === "win" && <h2>You Win!</h2>}
        {result === "lose" && <h2>Game Over!</h2>}
        <div>
          {result === "win" && (
            <img
              src={pikachuDance}
              alt="Pikachu Dance"
              className={styles.winImg}
            />
          )}
          {result === "lose" && (
            <img
              src={pikachuDizzy}
              alt="Pikachu dizzy eyes"
              className={styles.loseImg}
            />
          )}
        </div>
        <p>Your final score is {score}.</p>
        <div>
          <Button
            onClick={() => {
              dispatch({ type: "restart" });
              getLevel(level);
            }}
          >
            {result === "win" ? "Play" : "Try"} Again
          </Button>
          <Link to="/">
            <Button onClick={() => dispatch({ type: "restart" })}>Quit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
