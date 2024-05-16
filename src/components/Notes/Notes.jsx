import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import useDeleteNote from "../../hooks/useDeleteNote.js";
import useUpdateNote from "../../hooks/useUpdateNote.js";
import { backgroundColors, defaultNote } from "../../utils/general.js";
import AddNoteForm from "../AddNoteForm/AddNoteForm.jsx";
import Loader from "../Loader/Loader.jsx";
import Note from "../Note/Note.jsx";
import DeleteModal from "./Modals/DeleteModal.jsx";
import EditModal from "./Modals/EditModal.jsx";

const Notes = ({
  notes,
  fetchNotes,
  isFetching,
  numOfPages,
  limit,
  setLimit,
  page,
  setPage,
}) => {
  let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [noteToEdit, setNoteToEdit] = useState(defaultNote);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const { deleteNote, isPending: isDeleting } = useDeleteNote(
    fetchNotes,
    page,
    limit,
    closeDeleteModal
  );
  const { updateNote, isPending: isUpdating } = useUpdateNote(
    fetchNotes,
    page,
    limit,
    setNoteToEdit,
    closeEditModal
  );

  const handlePageChange = (e, value) => {
    setPage(value);
    fetchNotes(value, limit);
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
    deleteNote(noteToEdit);
  };

  const updateHandler = (note) => {
    setNoteToEdit({ ...note });
    openEditModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateNote(noteToEdit);
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

  return (
    <Box>
      <Box className="w-[80%] mx-auto h-[calc(100vh-64px)] flex flex-col justify-between">
        <Box>
          <Box className="flex justify-between items-center my-12">
            <AddNoteForm fetchNotes={fetchNotes} />
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
            {isFetching ? <Loader /> : renderNotes}
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
        isPending={isDeleting}
      />

      <EditModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        handleUpdate={handleUpdate}
        noteToEdit={noteToEdit}
        setNoteToEdit={setNoteToEdit}
        isPending={isUpdating}
      />
    </Box>
  );
};

export default Notes;
