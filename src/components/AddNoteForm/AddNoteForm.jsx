import { Box } from "@mui/material";
import React, { useState } from "react";
import useAddNote from "../../hooks/useAddNote.js";
import LoadingSVG from "../../utils/LoadingSVG.jsx";
import { defaultNote } from "../../utils/general.js";
import CancelModal from "../Notes/Modals/CancelModal.jsx";

const AddNoteForm = ({ fetchNotes }) => {
  let [isNewNoteInputsExpanded, setIsNewNoteInputsExpanded] = useState(false);
  let [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  let [newNote, setNewNote] = useState(defaultNote);

  let isValidNewNoteInputs =
    newNote !== undefined &&
    newNote?.title.trim() !== "" &&
    newNote?.content.trim() !== "";

  const toggleExpandedInputs = () => {
    setIsNewNoteInputsExpanded((prev) => !prev);
  };

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const { addNote, isPending } = useAddNote(
    fetchNotes,
    setNewNote,
    toggleExpandedInputs
  );

  const handleSubmitNewNote = async (e) => {
    e.preventDefault();
    addNote({ ...newNote });
  };

  const handleCancelNewNote = () => {
    setNewNote({ ...defaultNote });
    closeCancelModal();
    toggleExpandedInputs();
  };

  return (
    <Box className="flex-grow">
      <form onSubmit={handleSubmitNewNote}>
        {isNewNoteInputsExpanded ? (
          <Box className="flex flex-col gap-2 w-[80%]">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newNote?.title ?? ""}
              onChange={(e) => {
                setNewNote({ ...newNote, title: e.target.value });
              }}
              className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
            />
            <input
              type="text"
              name="content"
              placeholder="Content"
              value={newNote?.content ?? ""}
              onChange={(e) => {
                setNewNote({ ...newNote, content: e.target.value });
              }}
              className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
            />
            <Box className="flex items-center justify-end gap-2">
              <button
                type="submit"
                disabled={!isValidNewNoteInputs || isPending}
                className="text-white rounded-md px-4 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-200 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <LoadingSVG />
                    Loading...
                  </>
                ) : (
                  "Add Note"
                )}
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
      <CancelModal
        isOpen={isCancelModalOpen}
        closeModal={closeCancelModal}
        handleCancel={handleCancelNewNote}
      />
    </Box>
  );
};

export default AddNoteForm;
