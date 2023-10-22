import { useState } from "react";
import styles from "../styles/Setting.module.css";
import Button from "./Button";

function Setting({ setting, onSetting }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={isActive ? styles.active : styles.notActive}>
      <div className={isActive ? styles.display : styles.hide}>
        <Button
          icon={setting.music ? "volume-high" : "volume-xmark"}
          onClick={() => onSetting({ ...setting, music: !setting.music })}
        />
        <Button
          icon={setting.sound ? "music" : "ban"}
          onClick={() => onSetting({ ...setting, sound: !setting.sound })}
        />
      </div>
      <Button icon="gear" onClick={() => setIsActive(!isActive)} />
    </div>
  );
}

export default Setting;
