import { useState } from "react";
import styles from "../styles/CardList.module.css";
import Card from "./Card";

function CardList({ cards, dispatch }) {
  const [flipCard, setFlipCard] = useState(0);

  return (
    <ul className={styles.cardList}>
      {cards.map((card) => (
        <Card
          key={card.name}
          card={card}
          dispatch={dispatch}
          flipCard={flipCard}
          onFlipCard={setFlipCard}
        />
      ))}
    </ul>
  );
}

export default CardList;
