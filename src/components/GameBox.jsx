import { useContext, useEffect, useState } from "react";
import { getRandomCell } from "../logic/getRandomCell";
import { handleKeyPress } from "../logic/handleKeyPress";
import { renderGrid } from "../logic/renderGrid";
import { updateGame } from "../logic/updateGame";
import { GameContext } from "../context/GameContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const GRID_SIZE = 20;

const GameBoard = () => {
  const [food, setFood] = useState({ x: -1, y: -1 });
  const [snake, setSnake] = useState([
    { x: GRID_SIZE / 2, y: GRID_SIZE / 2 },
    { x: GRID_SIZE / 2, y: GRID_SIZE / 2 + 1 },
  ]);
  const [direction, setDirection] = useState("LEFT");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const { user } = useContext(GameContext);

  const handleKeyPressLocal = (e) =>
    handleKeyPress(e, cooldown, setCooldown, direction, setDirection);

  const runSnake = () =>
    updateGame(
      food,
      setFood,
      snake,
      setSnake,
      direction,
      setScore,
      setGameOver
    );

  useEffect(() => {
    const foodLocation = getRandomCell();
    setFood(foodLocation);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPressLocal);
    return () => {
      document.removeEventListener("keydown", handleKeyPressLocal);
    };
  });

  useEffect(() => {
    if (!gameOver) {
      const moveSnake = setInterval(runSnake, 200);
      return () => clearInterval(moveSnake);
    }
  });

  useEffect(() => {
    if (gameOver) {
      toast("Game Over and Restarting in 5 second", {
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setHighScore(score);

      setTimeout(() => {
        setFood(getRandomCell());
        setSnake([
          { x: GRID_SIZE / 2, y: GRID_SIZE / 2 },
          { x: GRID_SIZE / 2, y: GRID_SIZE / 2 + 1 },
        ]);
        setDirection("LEFT");
        setScore(0);
        setGameOver(false);
      }, 5000);
    }
  }, [gameOver]);

  return (
    <div className="">
      <div className="game-board">{renderGrid(snake, food)}</div>
      {user.token && <h1 className="score">High Score : {highScore}</h1>}
      <h1 className="score">Score : {score}</h1>
    </div>
  );
};

export default GameBoard;
