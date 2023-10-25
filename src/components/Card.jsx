import useSound from "use-sound";
import styles from "../styles/Card.module.css";
import Tilt from "react-parallax-tilt";
import pokemonPlayingCard from "../assets/pokemonPlayingCard.jpeg";
import cardFlipSound from "../assets/card-slide-sound-effect.mp3";

function Card({ card, dispatch, flipCard, onFlipCard }) {
  const [flipSound] = useSound(cardFlipSound);

  function handleCardFlip() {
    flipSound();
  }

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.7}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="12px"
    >
      <li
        className={styles.card}
        onClick={() => {
          handleCardFlip();
          onFlipCard(2);
        }}
        onAnimationEnd={() => onFlipCard(1)}
        flipCard={flipCard}
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
