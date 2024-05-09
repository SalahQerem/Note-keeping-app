import { ToastContainer } from "react-toastify";
import "./App.css";
import Notes from "./components/Notes/Notes.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Notes />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
