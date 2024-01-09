"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CardColumn from "./components/card-column";
import { Goal } from "./interfaces/goal";
import { CardColumnProps } from "./interfaces/card-column";
import { CardProps } from "./interfaces/card";

const initial_state = [
  {
    key: "kudos",
    title: "KUDOS",
    color: "gray",
    cards: [],
  },
  {
    key: "good",
    title: "GOOD",
    color: "green",
    cards: [],
  },
  {
    key: "not-so-good",
    title: "NOT SO GOOD",
    color: "red",
    cards: [],
  },
  {
    key: "ideas",
    title: "IDEAS",
    color: "blue",
    cards: [],
  },
];

const Home: React.FC = () => {
  const [sprintName, setSprintName] = useState("Sprint Name");
  const [sprintGoals, setSprintGoals] = useState<Goal[]>([]);
  const [cardColumns, setCardColumns] =
    useState<CardColumnProps[]>(initial_state);

  // TODO : Remove the logs
  useEffect(() => console.log("cardColumns", cardColumns), [cardColumns]);

  const addSprintGoal = () => {
    const newGoal = {
      id: uuidv4(),
      text: "New Goal",
      progress: 0,
    };
    setSprintGoals([...sprintGoals, newGoal]);
  };

  const removeSprintGoal = (goalId: string) => {
    setSprintGoals(sprintGoals.filter((goal) => goal.id !== goalId));
  };

  const updateSprintGoalProgress = (goalId: string, progress: number) => {
    setSprintGoals(
      sprintGoals.map((goal) =>
        goal.id === goalId ? { ...goal, progress } : goal
      )
    );
  };

  const updateSprintGoalText = (goalId: string, text: string) => {
    setSprintGoals(
      sprintGoals.map((goal) => (goal.id === goalId ? { ...goal, text } : goal))
    );
  };

  const cleanAll = () => {
    setSprintName("Sprint Name");
    setSprintGoals([]);
    setCardColumns(initial_state);
  };

  const setCards = (key: string, cards: CardProps[]): void => {
    setCardColumns((prevCardColumns) => {
      return prevCardColumns.map((column) => {
        if (column.key === key) {
          return {
            ...column,
            cards,
          };
        }
        return column;
      });
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full p-5">
        <div
          className="max-w-7xl mx-auto bg-cover bg-center shadow-2xl rounded-lg"
          style={{
            backgroundImage: `url('/image/sprint-retrospective-image.jpg')`,
          }}
        >
          <div className="bg-gray-800 p-5 rounded-lg">
            <h1 className="text-center text-6xl font-bold text-gray-100 uppercase tracking-widest">
              Sprint Retrospective
            </h1>
            <p className="mt-4 text-center text-xl text-gray-300">
              Time to reflect and improve!
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-10">
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                className="text-start text-3xl font-semibold text-gray-900 flex-1 pt-2 pb-2"
                value={sprintName}
                onChange={(e) => setSprintName(e.target.value)}
              />
              <button
                onClick={addSprintGoal}
                className="p-2 bg-blue-500 rounded text-white h-full ml-2"
              >
                Add Goal
              </button>
            </div>
            <button
              onClick={cleanAll}
              className="p-2 bg-red-500 rounded text-white"
            >
              Clean all
            </button>
          </div>

          {sprintGoals.map((goal) => (
            <div key={goal.id} className="mt-4 flex items-center">
              <input
                type="text"
                value={goal.text}
                onChange={(e) => updateSprintGoalText(goal.id, e.target.value)}
                className="flex-1 p-2 mr-2 border-2 border-gray-300 rounded"
              />
              <button
                onClick={() => removeSprintGoal(goal.id)}
                className="p-1 bg-red-600 rounded text-white"
                aria-label="Remove goal"
              >
                X
              </button>
              <span className="mr-2 text-gray-700 font-bold">Progress:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) =>
                  updateSprintGoalProgress(goal.id, Number(e.target.value))
                }
                className="flex-1"
              />
              <span>{goal.progress}%</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {cardColumns.map((column) => (
            <CardColumn
              key={column.key}
              title={column.title}
              color={column.color}
              cards={column.cards}
              setCards={(cards: CardProps[]) => setCards(column.key, cards)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
