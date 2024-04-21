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
  CustomAlert,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  backgroundColors,
  theme,
} from "./utils.js";
import CustomDialog from "../CustomDialog/CustomDialog.jsx";
import { Dialog } from "@headlessui/react";

const Notes = () => {
  let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  let [notes, setNotes] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [numOfPages, setNumOfPages] = useState(10);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(5);
  let [query, setQuery] = useState("");
  let [noteToEdit, setNoteToEdit] = useState({});

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

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
    fetchTodos(value);
  };

  const handleLimitChange = (e, { props }) => {
    const limit = props.value;
    setLimit(limit);
    fetchTodos(page, limit);
  };

  const handleSearch = (e) => {
    const title = e.target.value;
    setQuery(title);
    fetchTodos(page, limit, title);
  };

  const handleDeletion = (note) => {
    openDeleteModal();
    setNoteToEdit({ ...note });
  };

  const DeleteHandler = async () => {
    const res = await axios.delete(
      `https://note-keeping-api.onrender.com/notes/${noteToEdit._id}`
    );
    if (res.status === 204) {
      closeDeleteModal();
      fetchTodos(page, limit, query);
      CustomAlert(`${noteToEdit.title} successfully deleted`);
    }
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
              notes.map(({ _id, title, content, createdAt }, index) => {
                return (
                  <Note
                    id={_id}
                    key={_id}
                    title={title}
                    content={content}
                    creationDate={createdAt}
                    backgroundColor={backgroundColors[index % 10]}
                    handleDeletion={() => handleDeletion({ _id, title })}
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
      <CustomDialog
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        closeModal={closeDeleteModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Note Deletion
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {`Are you sure you wish to delete ${noteToEdit.title} Note ?`}
          </p>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-[#dddddd] hover:bg-gray-300 px-4 py-2 text-sm font-mediu focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={closeDeleteModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-[#c2344d] hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={DeleteHandler}
          >
            Yes, Sure!
          </button>
        </div>
      </CustomDialog>
    </div>
  );
};

export default Notes;
