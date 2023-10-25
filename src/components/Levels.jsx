import { NavLink } from "react-router-dom";
import Button from "./Button";

function Levels({ setting, dispatch }) {
  const defaultProps = {
    sound: setting.sound,
  };

  return (
    <div>
      <NavLink to="game">
        <Button
          {...defaultProps}
          onClick={() => dispatch({ type: "levelReceived", payload: "easy" })}
        >
          Easy
        </Button>
      </NavLink>
      <NavLink to="game">
        <Button
          {...defaultProps}
          onClick={() => dispatch({ type: "levelReceived", payload: "medium" })}
        >
          Medium
        </Button>
      </NavLink>
      <NavLink to="game">
        <Button
          {...defaultProps}
          onClick={() => dispatch({ type: "levelReceived", payload: "hard" })}
        >
          Hard
        </Button>
      </NavLink>
    </div>
  );
}

export default Levels;
