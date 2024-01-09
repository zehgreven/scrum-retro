import React, { useEffect } from "react";
import Card from "./card";
import { v4 as uuidv4 } from "uuid";
import { CardColumnProps } from "../interfaces/card-column";
import { CardProps } from "../interfaces/card";

const CardColumn: React.FC<any> = (
  props: CardColumnProps & {
    setCards: (cards: CardProps[]) => CardProps[];
  }
): JSX.Element => {
  const { title, color, cards, setCards } = props;

  // TODO : Remove the logs
  useEffect(() => console.log("cards", cards), [cards]);

  const addNewCard = (text: string) => {
    setCards([...cards, { id: uuidv4(), text }]);
  };

  const onRemove = (id: string) => {
    setCards(cards.filter((card, _) => card.id !== id));
  };

  const onChange = (id: string, text: string) => {
    setCards(cards.map((card, _) => (card.id === id ? { id, text } : card)));
  };

  return (
    <div className="flex flex-col w-1/4 mr-2">
      <div
        className={`bg-${color}-300 w-full h-24 mt-2 flex items-center justify-between text-base font-bold rounded-lg shadow-lg`}
      >
        <span className="mx-auto">{title}</span>
        <button
          onClick={() => addNewCard("")}
          className={`bg-transparent opacity-50 hover:opacity-100 font-semibold rounded-full mr-2 ring-2 ring-opacity-50 ring-black hover:ring-opacity-100`}
          aria-label="Add new card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
      </div>

      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          color={color}
          onRemove={onRemove}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default CardColumn;
