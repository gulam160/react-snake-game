import React, { useState } from "react";

export const GameContext = React.createContext();

export default function GameContextProvider({ children }) {
  const [user, setUser] = useState({ token: null, name: "", highScrore: 0 });

  const loginAndRecordScore = (token, name) => {
    setUser({ ...user, token, name });
  };

  return (
    <GameContext.Provider value={{ user, loginAndRecordScore }}>
      {children}
    </GameContext.Provider>
  );
}
