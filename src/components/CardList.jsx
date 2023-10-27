import { useState } from "react";
import styles from "../styles/CardList.module.css";
import Card from "./Card";

function CardList({ cards, dispatch, sound }) {
  const [flipcard, setFlipcard] = useState(0);

  return (
    <ul className={styles.cardList}>
      {cards.map((card) => (
        <Card
          key={card.name}
          card={card}
          dispatch={dispatch}
          sound={sound}
          flipcard={flipcard}
          onFlipcard={setFlipcard}
        />
      ))}
    </ul>
  );
}

export default CardList;
