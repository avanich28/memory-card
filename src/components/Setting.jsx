import { useState } from "react";
import styles from "../styles/Setting.module.css";
import { useSetting } from "../contexts/SettingContext";
import Button from "./Button";

function Setting() {
  const [isActive, setIsActive] = useState(false);
  const { setting, onSetting } = useSetting();

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
