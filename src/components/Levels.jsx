import { NavLink } from "react-router-dom";
import styles from "../styles/Levels.module.css";
import { useGame } from "../contexts/GameContext";
import Button from "./Button";

function Levels() {
  const { getLevel } = useGame();

  return (
    <div className={styles.levels}>
      <NavLink to="game">
        <Button onClick={() => getLevel("easy")}>Easy</Button>
      </NavLink>
      <NavLink to="game">
        <Button onClick={() => getLevel("medium")}>Medium</Button>
      </NavLink>
      <NavLink to="game">
        <Button onClick={() => getLevel("hard")}>Hard</Button>
      </NavLink>
    </div>
  );
}

export default Levels;
