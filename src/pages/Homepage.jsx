import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Homepage.module.css";
import { useGame } from "../contexts/GameContext";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Levels from "../components/Levels";

function Homepage() {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const { dispatch } = useGame();

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
          <Button onClick={handleStart}>Play game</Button>
        </div>
      )}
      {start && <Levels />}
      <Footer />
    </main>
  );
}

export default Homepage;
