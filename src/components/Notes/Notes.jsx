import React, { useEffect, useState } from "react";
import Note from "../Note/Note.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { Pagination } from "@mui/material";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(10);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const backgroundColors = [
    "#FFFFFF",
    "#F0F0F0",
    "#FFFFE0",
    "#87CEEB",
    "#E6E6FA",
    "#FFE5B4",
    "#F5F5DC",
    "#B0E0E6",
    "#FFC0CB",
  ];
  const fetchTodos = async (page = 1, limit = 5) => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://note-keeping-api.onrender.com/notes?page=${page}&limit=${limit}`
    );
    setNotes(data.notes);
    setNumOfPages(data.numOfPages);
    setIsLoading(false);
  };

  const handleChange = (e, value) => {
    setPage(value);
    fetchTodos(value, limit);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-[80%] mx-auto h-[calc(100vh-64px)] flex flex-col justify-between">
      <div>
        <form action="" className="my-12 flex justify-center">
          <input
            type="text"
            name="note"
            placeholder="Take a note..."
            className="border border-slate-300 w-[60%] rounded-md px-3 py-2 shadow-lg"
          />
        </form>
        <div className="flex flex-wrap gap-2 items-start">
          {isLoading ? (
            <Loader />
          ) : (
            notes.map(({ title, content, createdAt }, index) => {
              return (
                <Note
                  key={index}
                  title={title}
                  content={content}
                  creationDate={createdAt}
                  backgroundColor={backgroundColors[index % 10]}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="flex justify-center py-3 mb-5">
        <Pagination count={numOfPages} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}

export default Notes;
