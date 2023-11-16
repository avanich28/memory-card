import useSound from "use-sound";
import Tilt from "react-parallax-tilt";
import styles from "../styles/Card.module.css";
import { useSetting } from "../contexts/SettingContext";
import { useGame } from "../contexts/GameContext";
import pokemonPlayingCard from "../assets/pokemonPlayingCard.jpeg";
import cardFlipSound from "../assets/card-slide-sound-effect.mp3";

function Card({ card, flipcard, onFlipcard, onSwitchCard }) {
  const { setting } = useSetting();
  const { status, dispatch } = useGame();
  const [flipSound] = useSound(cardFlipSound, { volume: 0.3 });

  function handleCardFlip() {
    if (setting.sound) flipSound();
  }

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.5}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="12px"
    >
      <li
        className={styles.card}
        onAnimationEnd={() => onFlipcard(1)}
        flipcard={status === "finished" ? 3 : flipcard}
      >
        <div
          className={styles.cardFront}
          onClick={() => {
            handleCardFlip();
            dispatch({ type: "checkAnswer", payload: card.name });
            onSwitchCard();
          }}
        >
          <div>
            <img src={card.img} alt={card.name} />
          </div>
          <p>{card.name}</p>
        </div>
        <div className={styles.cardBack}>
          <img src={pokemonPlayingCard} alt="Pokemon playing card" />
        </div>
      </li>
    </Tilt>
  );
}

export default Card;
