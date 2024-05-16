import { Dialog } from "@headlessui/react";
import { Box, Button } from "@mui/material";
import React from "react";
import CustomDialog from "../../CustomDialog/CustomDialog.jsx";
import LoadingSVG from "../../../utils/LoadingSVG.jsx";

const EditModal = ({
  isOpen,
  closeModal,
  handleUpdate,
  noteToEdit,
  setNoteToEdit,
  isPending,
}) => {
  let isValidEditNoteInputs =
    noteToEdit.title.trim() !== "" && noteToEdit.content.trim() !== "";
  return (
    <CustomDialog isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Update Note
      </Dialog.Title>
      <form onSubmit={handleUpdate}>
        <Box className="mt-5 flex flex-col gap-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={noteToEdit.title}
            onChange={(e) => {
              setNoteToEdit({ ...noteToEdit, title: e.target.value });
            }}
            className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
          />
          <textarea
            type="text"
            name="content"
            placeholder="Content"
            value={noteToEdit.content}
            onChange={(e) => {
              setNoteToEdit({ ...noteToEdit, content: e.target.value });
            }}
            className="border border-slate-300 rounded-md px-3 py-2 shadow-lg"
          />
        </Box>

        <Box className="mt-4 flex justify-end gap-2">
          <button
            type="submit"
            disabled={!isValidEditNoteInputs || isPending}
            className="text-white capitalize rounded-md px-4 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-200 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <LoadingSVG />
                Loading...
              </>
            ) : (
              "Update Note"
            )}
          </button>
          <Button
            type="button"
            className="rounded-md bg-[#dddddd] text-black capitalize hover:bg-gray-300 px-4 py-2 text-sm font-medium"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </CustomDialog>
  );
};

export default EditModal;
