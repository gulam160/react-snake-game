import "./App.css";
import { useContext, useEffect, useState } from "react";
import GameBox from "./components/GameBox";
import SignInForm from "./components/SignInForm";
import { GameContext } from "./context/GameContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const {
    user: { name, token },
  } = useContext(GameContext);

  useEffect(() => {
    if (token)
      toast("Signin successfull", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }, [token]);

  return (
    <div className="App">
      {token && <header className="header">Player : {name}</header>}
      {token || showSignInForm ? <GameBox /> : <SignInForm />}
      <button
        className="toggle-btn"
        onClick={() => setShowSignInForm(!showSignInForm)}
      >
        {!showSignInForm
          ? "Play without sign-in"
          : "Sign-in to record high scores"}
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
