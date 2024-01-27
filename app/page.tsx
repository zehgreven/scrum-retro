"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { io, Socket } from "socket.io-client";

import CardColumn from "./components/card-column";
import { CardProps } from "./interfaces/card";
import { CardColumnProps } from "./interfaces/card-column";
import { Goal } from "./interfaces/goal";

const initial_state = [
  {
    id: "kudos",
    title: "KUDOS",
    color: "gray",
    cards: [],
  },
  {
    id: "good",
    title: "GOOD",
    color: "green",
    cards: [],
  },
  {
    id: "not-so-good",
    title: "NOT SO GOOD",
    color: "red",
    cards: [],
  },
  {
    id: "ideas",
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
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("sprintGoalsAdded", onSprintGoalsAdded);
    socket?.on("sprintGoalsRemoved", onSprintGoalsRemoved);
    socket?.on("sprintGoalsProgressChanged", onSprintGoalsProgressChanged);
    socket?.on("sprintGoalsTextChanged", onSprintGoalsTextChanged);
    socket?.on("sprintNameTextChanged", onSprintNameTextChanged);
    socket?.on("cleanAllClicked", onCleanAll);
    socket?.on("cardChanged", setCards);
  }, [socket]);

  // TODO : Remove the logs
  // useEffect(() => console.log("cardColumns", cardColumns), [cardColumns]);

  const onSprintGoalsAdded = (newGoal: Goal) => {
    setSprintGoals((goals) => [...goals, newGoal]);
  };

  const addSprintGoal = () => {
    const newGoal = {
      id: uuidv4(),
      text: "New Goal",
      progress: 0,
    };
    socket?.emit("sprintGoalsAdded", newGoal);
  };

  const sprintNameTextChanged = (text: string) => {
    setSprintName(text);

    socket?.emit("sprintNameTextChanged", text);
  };

  const onSprintNameTextChanged = (text: string) => {
    setSprintName(text);
  };

  const onSprintGoalsRemoved = (goalId: string) => {
    setSprintGoals((goals) => goals.filter((goal) => goal.id !== goalId));
  };

  const removeSprintGoal = (goalId: string) => {
    socket?.emit("sprintGoalsRemoved", goalId);
  };

  const onSprintGoalsProgressChanged = (goalId: string, progress: number) => {
    setSprintGoals((goals) =>
      goals.map((goal) => (goal.id === goalId ? { ...goal, progress } : goal))
    );
  };

  const updateSprintGoalProgress = (goalId: string, progress: number) => {
    onSprintGoalsProgressChanged(goalId, progress);
    socket?.emit("sprintGoalsProgressChanged", goalId, progress);
  };

  const onSprintGoalsTextChanged = (goalId: string, text: string) => {
    setSprintGoals((goals) =>
      goals.map((goal) => (goal.id === goalId ? { ...goal, text } : goal))
    );
  };

  const updateSprintGoalText = (goalId: string, text: string) => {
    onSprintGoalsTextChanged(goalId, text);
    socket?.emit("sprintGoalsTextChanged", goalId, text);
  };

  const onCleanAll = () => {
    setSprintName("Sprint Name");
    setSprintGoals([]);
    setCardColumns(initial_state);
  };

  const cleanAll = () => {
    socket?.emit("cleanAllClicked");
  };

  const onCardChanged = (id: string, cards: CardProps[]): void => {
    socket?.emit("cardChanged", id, cards);
  };

  const setCards = (id: string, cards: CardProps[]): void => {
    console.log("setCards", id, cards);

    setCardColumns((columns) => {
      return columns.map((column) => {
        if (column.id === id) {
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
        <div className="max-w-7xl mx-auto bg-cover bg-center shadow-2xl rounded-lg">
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
                onChange={(e) => sprintNameTextChanged(e.target.value)}
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
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              cards={column.cards}
              setCards={setCards}
              onCardChanged={onCardChanged}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
