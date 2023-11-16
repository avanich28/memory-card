import { useState } from "react";
import styles from "../styles/Guild.module.css";
import ash from "../assets/ash.gif";
import Button from "./Button";

function Guild() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={isActive ? styles.active : styles.notActive}>
      <div className={isActive ? styles.display : styles.hide}>
        <div>
          <p>Each card can be clicked only one time. Have fun!</p>
        </div>
        <div>
          <img src={ash} alt="Ash" />
        </div>
      </div>
      <Button
        icon={isActive ? "xmark" : "question"}
        onClick={() => setIsActive((is) => !is)}
      />
    </div>
  );
}

export default Guild;
