import styles from "../styles/GameResult.module.css";
import ditto from "../assets/ditto.png";
import voltorb from "../assets/voltorb.png";
import Button from "./Button";

function GameResult({ result, score }) {
  return (
    <div className={styles.gameResult}>
      <div>
        {result === "win" && <h2>You Win!</h2>}
        {result === "lose" && <h2>Game Over!</h2>}
        <div>
          {result === "win" && <img src={ditto} alt="Ditto" />}
          {result === "lose" && <img src={voltorb} alt="Voltorb" />}
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
