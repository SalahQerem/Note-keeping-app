import { ToastContainer } from "react-toastify";
import "./App.css";
import Notes from "./components/Notes/Notes.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme/theme.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import useGetNotes from "./hooks/useGetNotes.js";

function App() {
  let [notes, setNotes] = useState([]);
  let [numOfPages, setNumOfPages] = useState(10);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(5);

  const { fetchNotes, isFetching } = useGetNotes(setNotes, setNumOfPages);

  useEffect(() => {
    fetchNotes(page, limit);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar fetchNotes={fetchNotes} />
      <Notes
        notes={notes}
        fetchNotes={fetchNotes}
        isFetching={isFetching}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        numOfPages={numOfPages}
      />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
