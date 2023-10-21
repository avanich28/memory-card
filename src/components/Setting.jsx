import { useState } from "react";
import styles from "../styles/Setting.module.css";
import Button from "./Button";

function Setting() {
  const [isActive, setIsActive] = useState(false);
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);

  return (
    <div className={isActive ? styles.active : styles.notActive}>
      <div className={isActive ? styles.display : styles.hide}>
        <Button
          icon={music ? "volume-high" : "volume-xmark"}
          onClick={() => setMusic(!music)}
        />
        <Button
          icon={sound ? "music" : "ban"}
          onClick={() => setSound(!sound)}
        />
      </div>
      <Button icon="gear" onClick={() => setIsActive(!isActive)} />
    </div>
  );
}

export default Setting;
