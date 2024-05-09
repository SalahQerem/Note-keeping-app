import { Box } from "@mui/material";
import React, { useState } from "react";
import { defaultNote } from "../../utils/general.js";
import CancelModal from "../Notes/Modals/CancelModal.jsx";
import useAddNote from "../hooks/useAddNote.js";
import useNotesModals from "../hooks/useNotesModals.js";

const AddNoteForm = () => {
  let [isNewNoteInputsExpanded, setIsNewNoteInputsExpanded] = useState(false);
  let [newNote, setNewNote] = useState(defaultNote);

  let isValidNewNoteInputs =
    newNote !== undefined &&
    newNote?.title.trim() !== "" &&
    newNote?.content.trim() !== "";

  const toggleExpandedInputs = () => {
    setIsNewNoteInputsExpanded((prev) => !prev);
  };

  //   const { fetchNotes } = useGetNotes(setNotes, setNumOfPages);
  const { addNote, isPending } = useAddNote(setNewNote, toggleExpandedInputs);

  const {
    CancelModal: { isCancelModalOpen, openCancelModal, closeCancelModal },
  } = useNotesModals();

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
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.313 1.344 6.315 3.514 8.485l2.486-2.194z"
                      ></path>
                    </svg>
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
