import { useState } from "react";
import styles from "../styles/Homepage.module.css";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Levels from "../components/Levels";

function Homepage({ setting, onSetting }) {
  const [start, setStart] = useState(false);

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
      {start && <Levels setting={setting} />}
      <Footer setting={setting} onSetting={onSetting} />
    </main>
  );
}

export default Homepage;
