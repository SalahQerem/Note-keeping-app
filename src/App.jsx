import { ToastContainer } from "react-toastify";
import "./App.css";
import Notes from "./components/Notes/Notes.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme/theme.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useState } from "react";

function App() {
  let [notes, setNotes] = useState([]);
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Notes notes={notes} setNotes={setNotes} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
