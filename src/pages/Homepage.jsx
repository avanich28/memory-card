import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Homepage.module.css";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Levels from "../components/Levels";

function Homepage({ setting, onSetting, dispatch, status }) {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

  useEffect(
    function () {
      window.onpopstate = function () {
        dispatch({ type: "restart" });
        navigate("/");
      };
    },
    [dispatch, navigate]
  );

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
