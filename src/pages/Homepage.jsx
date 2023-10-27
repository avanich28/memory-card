import { useState } from "react";
import styles from "../styles/Homepage.module.css";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Levels from "../components/Levels";

function Homepage({ setting, onSetting, dispatch, status }) {
  const [start, setStart] = useState(false);
  console.log(status);

  function handleStart() {
    setStart(true);
  }

  return (
    <main className={styles.homepage}>
      <Logo />
      {!start && (
        <div>
          <Button onClick={handleStart} sound={setting.sound}>
            Play game
          </Button>
        </div>
      )}
      {start && <Levels setting={setting} dispatch={dispatch} />}
      <Footer setting={setting} onSetting={onSetting} />
    </main>
  );
}

export default Homepage;
