import styles from "../styles/Scores.module.css";
import { useGame } from "../contexts/GameContext";
import star from "../assets/star.png";

function Scores() {
  const { score, maxScore, highscore } = useGame();

  return (
    <>
      <div className={styles.scores}>
        <p>Score: {score}</p>
        <div>
          <p>Best Score:</p>
          <span>
            <img src={star} alt="Star" />
            <p>{highscore}</p>
          </span>
        </div>
      </div>
      <p>
        {score}/{maxScore}
      </p>
    </>
  );
}

export default Scores;
