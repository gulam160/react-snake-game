import { getRandomCell } from "./getRandomCell";

export const updateGame = (
  food,
  setFood,
  snake,
  setSnake,
  direction,
  setScore,
  setGameOver
) => {
  // Check Game Over
  if (
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    snake[0].x >= 20 ||
    snake[0].y >= 20
  ) {
    setGameOver(true);
  }

  // Move snake
  let newSnake = [...snake];
  if (direction === "UP") {
    newSnake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
  } else if (direction === "DOWN") {
    newSnake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
  } else if (direction === "LEFT") {
    newSnake.unshift({ x: snake[0].x - 1, y: snake[0].y });
  } else if (direction === "RIGHT") {
    newSnake.unshift({ x: snake[0].x + 1, y: snake[0].y });
  }

  if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
    // ATE FOOD
    setFood(getRandomCell());
    setScore((prev) => prev + 1);
    setSnake(newSnake);
  } else {
    // WITHOUT FOOD
    newSnake.pop();
    setSnake(newSnake);
  }
};
