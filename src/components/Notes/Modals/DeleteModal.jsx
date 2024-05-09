import { Dialog } from "@headlessui/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CustomDialog from "../../CustomDialog/CustomDialog.jsx";
import LoadingSVG from "../../../utils/LoadingSVG.jsx";

const DeleteModal = ({
  isOpen,
  closeModal,
  handleDelete,
  noteToEdit,
  isPending,
}) => {
  return (
    <CustomDialog isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Note Deletion
      </Dialog.Title>
      <Box className="mt-2">
        <Typography variant="body1" className="text-sm text-gray-500">
          {`Are you sure you wish to delete ${noteToEdit.title} Note ?`}
        </Typography>
      </Box>

      <Box className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="capitalize text-white rounded-md px-4 py-2 text-sm font-medium bg-[#c2344d] hover:bg-red-800"
        >
          {isPending ? (
            <>
              <LoadingSVG />
              Loading...
            </>
          ) : (
            "Yes, Sure!"
          )}
        </button>
        <Button
          type="button"
          className="capitalize text-black rounded-md bg-[#dddddd] hover:bg-gray-300 px-4 py-2 text-sm font-medium"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Box>
    </CustomDialog>
  );
};

export default DeleteModal;
