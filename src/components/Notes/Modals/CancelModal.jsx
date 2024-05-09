import { Dialog } from "@headlessui/react";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "../../CustomDialog/CustomDialog.jsx";

const CancelModal = ({ isOpen, closeModal, handleCancel }) => {
  return (
    <CustomDialog isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        New Note Cancelation
      </Dialog.Title>
      <Box className="mt-2">
        <Typography variant="body1" className="text-sm text-gray-500">
          {`Are you sure you wish to cancel this Note ?`}
        </Typography>
      </Box>

      <Box className="mt-4 flex justify-end gap-2">
        <Button
          type="button"
          className="text-white capitalize rounded-md px-4 py-2 text-sm font-medium bg-[#c2344d] hover:bg-red-800"
          onClick={handleCancel}
        >
          Yes, Sure!
        </Button>
        <Button
          type="button"
          className="rounded-md capitalize bg-[#dddddd] text-black hover:bg-gray-300 px-4 py-2 text-sm font-medium"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Box>
    </CustomDialog>
  );
};

export default CancelModal;
