import { useState } from "react";
import styles from "../styles/Homepage.module.css";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Levels from "../components/Levels";

function Homepage({ setting, onSetting }) {
  const [start, setStart] = useState(false);

  return (
    <main className={styles.homepage}>
      <Logo />
      {!start && (
        <div>
          <Button onClick={() => setStart(true)}>Play game</Button>
        </div>
      )}
      {start && <Levels />}
      <Footer setting={setting} onSetting={onSetting} />
    </main>
  );
}

export default Homepage;
