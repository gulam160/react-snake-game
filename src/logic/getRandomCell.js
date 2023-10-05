import { GRID_SIZE } from "../components/GameBox";


export const getRandomCell = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};
