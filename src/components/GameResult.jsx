import styles from "../styles/GameResult.module.css";
import pikachuDance from "../assets/pikachu-dance.gif";
import pikachuDizzy from "../assets/pikachu-dizzy.webp";
import Button from "./Button";

function GameResult({ result, score }) {
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
          <Button>Play Again</Button>
          <Button>Quit</Button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
