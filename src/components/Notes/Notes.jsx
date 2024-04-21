import React, { useEffect, useState } from "react";
import Note from "../Note/Note.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

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

  const handlePageChange = (e, value) => {
    setPage(value);
    fetchTodos(value, limit);
  };

  const handleLimitChange = (e, value) => {
    setLimit(value.props.value);
    fetchTodos(page, value.props.value);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-[80%] mx-auto h-[calc(100vh-64px)] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <form action="" className="my-12 w-full">
            <input
              type="text"
              name="note"
              placeholder="Take a note..."
              className="border border-slate-300 w-[80%] rounded-md px-3 py-2 shadow-lg"
            />
          </form>
          <Box sx={{ maxWidth: 100 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="limit"
                onChange={handleLimitChange}
                sx={{
                  height: "42px",
                  textAlign: "center",
                  width: "100px",
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                }}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
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
        <Pagination
          count={numOfPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Notes;
