export const handleKeyPress = (
  e,
  cooldown,
  setCooldown,
  direction,
  setDirection
) => {
  if (!cooldown) {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
    }
  }
  setCooldown(true);
  setTimeout(() => setCooldown(false), 100);
};
