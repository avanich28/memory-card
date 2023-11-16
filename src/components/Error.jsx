import { Link } from "react-router-dom";
import styles from "../styles/Error.module.css";
import { useGame } from "../contexts/GameContext";
import Button from "./Button";

function Error() {
  const { errorMsg } = useGame();

  return (
    <div className={styles.error}>
      <p>{errorMsg}</p>
      <Link to="/">
        <Button>Reload</Button>
      </Link>
    </div>
  );
}

export default Error;
