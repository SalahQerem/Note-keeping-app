import React, { useEffect, useState } from "react";
import Note from "../Note/Note.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  backgroundColors,
  theme,
} from "./utils.js";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(10);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchTodos = async (page = 1, limit = 5, title = "") => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://note-keeping-api.onrender.com/notes?page=${page}&limit=${limit}&title=${title}`
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
    fetchTodos(page, limit);
  };

  const handleSearch = (e) => {
    const title = e.target.value;
    fetchTodos(page, limit, title);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              My Note Keeper
            </Typography>
            <Search
              sx={{
                backgroundColor: "rgba(0,0,0,0.05)",
                flexGrow: 1,
                maxWidth: "600px",
              }}
              onChange={handleSearch}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
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
            <Box
              sx={{
                maxWidth: 100,
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
              }}
            >
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
    </div>
  );
}

export default Notes;
