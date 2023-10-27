import styles from "../styles/Loading.module.css";
import pokemonWalking from "../assets/pokemon-walk.gif";

function Loading() {
  return (
    <div className={styles.loading}>
      <div>
        <img src={pokemonWalking} alt="Pokemon Walking" />
      </div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
