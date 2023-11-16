import { useState } from "react";
import styles from "../styles/CardList.module.css";
import { useGame } from "../contexts/GameContext";
import Card from "./Card";

function CardList({ sound }) {
  const { cards } = useGame();
  const [flipcard, setFlipcard] = useState(0);
  const [newCards, setNewCards] = useState(cards);

  function handleSwitchCard() {
    let arr = [];
    let i = 0;
    while (i < cards.length) {
      const randomNum = Math.abs(Math.floor(Math.random() * cards.length));
      if (!arr.includes(randomNum)) {
        arr.push(randomNum);
        i++;
      }
    }

    setFlipcard(2);
    setNewCards(arr.map((num) => cards[num]));
  }

  return (
    <ul className={styles.cardList}>
      {newCards.map((card) => (
        <Card
          key={card.name}
          card={card}
          flipcard={flipcard}
          onFlipcard={setFlipcard}
          onSwitchCard={handleSwitchCard}
        />
      ))}
    </ul>
  );
}

export default CardList;
