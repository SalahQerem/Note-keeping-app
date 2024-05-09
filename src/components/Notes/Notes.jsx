import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backgroundColors, defaultNote } from "../../utils/general.js";
import Loader from "../Loader/Loader.jsx";
import Note from "../Note/Note.jsx";
import useAddNote from "../hooks/useAddNote.js";
import useGetNotes from "../hooks/useGetNotes.js";
import CancelModal from "./Modals/CancelModal.jsx";
import DeleteModal from "./Modals/DeleteModal.jsx";
import EditModal from "./Modals/EditModal.jsx";
import useNotesModals from "../hooks/useNotesModals.js";

const Notes = ({ notes, setNotes }) => {
  let [numOfPages, setNumOfPages] = useState(10);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(5);

  let [newNote, setNewNote] = useState(defaultNote);
  let [noteToEdit, setNoteToEdit] = useState(defaultNote);

  let [isNewNoteInputsExpanded, setIsNewNoteInputsExpanded] = useState(false);

  const toggleExpandedInputs = () => {
    setIsNewNoteInputsExpanded((prev) => !prev);
  };

  const { fetchNotes, isFetching } = useGetNotes(setNotes, setNumOfPages);
  const { addNote, isPending } = useAddNote(
    fetchNotes,
    setNewNote,
    toggleExpandedInputs
  );

  const {
    DeleteModal: { isDeleteModalOpen, openDeleteModal, closeDeleteModal },
    CancelModal: { isCancelModalOpen, openCancelModal, closeCancelModal },
    EditModal: { isEditModalOpen, openEditModal, closeEditModal },
  } = useNotesModals();

  let isValidNewNoteInputs =
    newNote.title.trim() !== "" && newNote.content.trim() !== "";

  const handlePageChange = (e, value) => {
    setPage(value);
    fetchNotes(value);
  };

  const handleLimitChange = (e, { props }) => {
    const limit = props.value;
    setLimit(limit);
    fetchNotes(page, limit);
  };

  const deleteHandler = (note) => {
    setNoteToEdit({ ...note });
    openDeleteModal();
  };

  const handleDelete = async () => {
    const res = await axios.delete(
      `https://note-keeping-api.onrender.com/notes/${noteToEdit._id}`
    );
    if (res.status === 204) {
      closeDeleteModal();
      fetchTodos(page, limit, query);
      CustomAlert(`${noteToEdit.title} successfully deleted`);
    }
  };

  const handleCancelNewNote = () => {
    setNewNote(defaultNote);
    closeCancelModal();
    toggleExpandedInputs();
  };

  const handleSubmitNewNote = async (e) => {
    e.preventDefault();
    addNote(newNote);
  };

  const updateHandler = (note) => {
    setNoteToEdit({ ...note });
    openEditModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, title, content } = noteToEdit;
    const res = await axios.put(
      `https://note-keeping-api.onrender.com/notes/${_id}`,
      { title, content }
    );

    if (res.status === 204) {
      CustomAlert("Your Note successfully updated");
      closeEditModal();
      setNoteToEdit(defaultNote);
      fetchTodos(page, limit, query);
    }
  };

  const renderNotes = notes.map(({ _id, title, content, createdAt }, index) => {
    return (
      <Note
        key={_id}
        title={title}
        content={content}
        creationDate={createdAt}
        backgroundColor={backgroundColors[index % 10]}
        deleteHandler={() => deleteHandler({ _id, title, content })}
        updateHandler={() => updateHandler({ _id, title, content })}
      />
    );
  });

  useEffect(() => {
    fetchNotes(page, limit);
  }, []);

  return (
    <Box>
      <Box className="w-[80%] mx-auto h-[calc(100vh-64px)] flex flex-col justify-between">
        <Box>
          <Box className="flex justify-between items-center">
            <form className="my-12 w-full" onSubmit={handleSubmitNewNote}>
              {isNewNoteInputsExpanded ? (
                <Box className="flex flex-col gap-2 w-[80%]">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={(e) => {
                      setNewNote({ ...newNote, title: e.target.value });
                    }}
                    className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
                  />
                  <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={newNote.content}
                    onChange={(e) => {
                      setNewNote({ ...newNote, content: e.target.value });
                    }}
                    className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
                  />
                  <Box className="flex items-center justify-end gap-2">
                    <button
                      type="submit"
                      disabled={!isValidNewNoteInputs}
                      className="text-white rounded-md px-4 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-200 disabled:cursor-not-allowed"
                    >
                      Add Note
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-[#dddddd] hover:bg-gray-300 px-4 py-2 text-sm font-medium"
                      onClick={openCancelModal}
                    >
                      Cancel
                    </button>
                  </Box>
                </Box>
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
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box id="notes" className="flex flex-wrap gap-2 items-start">
            {isFetching || isPending ? <Loader /> : renderNotes}
          </Box>
        </Box>
        <Box className="flex justify-center py-3 mb-5">
          <Pagination
            count={numOfPages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
        noteToEdit={noteToEdit}
      />
      <CancelModal
        isOpen={isCancelModalOpen}
        closeModal={closeCancelModal}
        handleCancel={handleCancelNewNote}
      />
      <EditModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        handleUpdate={handleUpdate}
        noteToEdit={noteToEdit}
      />
    </Box>
  );
};

export default Notes;
