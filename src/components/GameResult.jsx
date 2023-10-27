import styles from "../styles/GameResult.module.css";

function GameResult({ result }) {
  return <div className={styles.gameResult}>{result}</div>;
}

export default GameResult;
