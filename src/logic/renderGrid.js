import { GRID_SIZE } from "../components/GameBox";

export const renderGrid = (snake, food) => {
  const cells = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      // Render Snake
      const isSnake = snake.some(
        (segment) => segment.x === col && segment.y === row
      );

      // Render Food
      const isFood = food.x === col && food.y === row;
      let cellClass = "cell";
      if (isSnake) {
        cellClass += " snake";
      }
      if (isFood) {
        cellClass += " food";
      }
      cells.push(<div key={`${row}-${col}`} className={cellClass}></div>);
    }
  }
  return cells;
};
