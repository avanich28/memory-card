import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/GamePage.module.css";
import { useGame } from "../contexts/GameContext";
import logo from "../assets/logo.svg";
import Footer from "../components/Footer";
import Scores from "../components/Scores";
import CardList from "../components/CardList";
import Loading from "../components/Loading";
import GameResult from "../components/GameResult";
import Error from "../components/Error";

const SEC = 5;

function GamePage() {
  const navigate = useNavigate();
  const { status, dispatch } = useGame();

  useEffect(
    function () {
      const timer = setTimeout(() => {
        if (status === "loading") {
          dispatch({ type: "restart" });
          navigate("/");
        }
      }, SEC * 1000);

      return () => clearTimeout(timer);
    },
    [status, navigate, dispatch]
  );

  return (
    <main className={styles.gamePage}>
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {(status === "ready" || status === "finished") && (
        <>
          <Link to="/">
            <img
              src={logo}
              alt="Pokemon Logo"
              onClick={() => dispatch({ type: "restart" })}
            />
          </Link>
          <main>
            <Scores />
            <CardList />
          </main>
          <Footer />
        </>
      )}
      {status === "finished" && <GameResult />}
    </main>
  );
}

export default GamePage;
