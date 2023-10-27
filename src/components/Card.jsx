import useSound from "use-sound";
import styles from "../styles/Card.module.css";
import Tilt from "react-parallax-tilt";
import pokemonPlayingCard from "../assets/pokemonPlayingCard.jpeg";
import cardFlipSound from "../assets/card-slide-sound-effect.mp3";

function Card({ card, dispatch, sound, flipcard, onFlipcard }) {
  const [flipSound] = useSound(cardFlipSound);

  function handleCardFlip() {
    if (sound) flipSound();
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
        onClick={() => {
          handleCardFlip();
          onFlipcard(2);
        }}
        onAnimationEnd={() => onFlipcard(1)}
        flipcard={flipcard}
      >
        <div className={styles.cardFront}>
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