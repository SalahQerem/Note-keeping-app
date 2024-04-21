import { ToastContainer } from "react-toastify";
import "./App.css";
import Notes from "./components/Notes/Notes.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Notes />
      <ToastContainer />
    </>
  );
}

export default App;
