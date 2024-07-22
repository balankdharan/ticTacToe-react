import "./App.css";
import Board from "./components/Board/Board";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Board />
      <Toaster />
    </div>
  );
};

export default App;
