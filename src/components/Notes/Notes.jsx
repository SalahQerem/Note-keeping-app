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
  let [isCancelAddNoteModalOpen, setIsCancelAddNoteModalOpen] = useState(false);
  let [notes, setNotes] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [numOfPages, setNumOfPages] = useState(10);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(5);
  let [query, setQuery] = useState("");
  let [noteToEdit, setNoteToEdit] = useState({});
  let [isNewNoteInputsExpanded, setIsNewNoteInputsExpanded] = useState(false);
  let [newNoteTitle, setNewNoteTitle] = useState("");
  let [newNoteContent, setNewNoteContent] = useState("");
  let [isValidInputs, setIsValidInputs] = useState(false);

  let isValidNewNoteInputs =
    newNoteTitle.trim() !== "" && newNoteContent.trim() !== "";

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function openCancelAddNoteModal() {
    setIsCancelAddNoteModalOpen(true);
  }

  function closeCancelAddNoteModal() {
    setIsCancelAddNoteModalOpen(false);
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

  const toggleExpandedInputs = () => {
    setIsNewNoteInputsExpanded((prev) => !prev);
  };

  const handleNewNoteCancel = () => {
    setContent("");
    setNewNoteTitle("");
    closeCancelAddNoteModal();
    toggleExpandedInputs();
  };

  const handleNewNoteSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://note-keeping-api.onrender.com/notes",
      {
        title: newNoteTitle,
        content: newNoteContent,
      }
    );
    if (res.status === 201) {
      CustomAlert("New Note successfully Added");
      setNewNoteTitle("");
      setNewNoteContent("");
      closeCancelAddNoteModal();
      toggleExpandedInputs();
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
            <form className="my-12 w-full" onSubmit={handleNewNoteSubmit}>
              {isNewNoteInputsExpanded ? (
                <div className="flex flex-col gap-2 w-[80%]">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newNoteTitle}
                    onChange={(e) => {
                      setNewNoteTitle(e.target.value);
                    }}
                    className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
                  />
                  <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={newNoteContent}
                    onChange={(e) => {
                      setNewNoteContent(e.target.value);
                    }}
                    className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="submit"
                      disabled={!isValidNewNoteInputs}
                      className="text-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-200 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      Add Note
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#dddddd] hover:bg-gray-300 px-4 py-2 text-sm font-mediu focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={openCancelAddNoteModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="border border-slate-300 w-[80%] rounded-md px-4 py-2 shadow-lg text-left"
                  onClick={toggleExpandedInputs}
                >
                  Take a note...
                </button>
              )}
            </form>
            <Box
              sx={{
                maxWidth: 100,
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Limit</InputLabel>
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
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div id="notes" className="flex flex-wrap gap-2 items-start">
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
            className="text-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-[#c2344d] hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={DeleteHandler}
          >
            Yes, Sure!
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-[#dddddd] hover:bg-gray-300 px-4 py-2 text-sm font-mediu focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={closeDeleteModal}
          >
            Cancel
          </button>
        </div>
      </CustomDialog>
      <CustomDialog
        isOpen={isCancelAddNoteModalOpen}
        setIsOpen={setIsCancelAddNoteModalOpen}
        closeModal={closeCancelAddNoteModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          New Note Cancelation
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {`Are you sure you wish to cancel this Note ?`}
          </p>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="text-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-[#c2344d] hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={handleNewNoteCancel}
          >
            Yes, Sure!
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-[#dddddd] hover:bg-gray-300 px-4 py-2 text-sm font-mediu focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={closeCancelAddNoteModal}
          >
            Cancel
          </button>
        </div>
      </CustomDialog>
    </div>
  );
};

export default Notes;
