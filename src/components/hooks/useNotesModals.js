import { useState } from "react";

const useNotesModals = () => {
  let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  return {
    DeleteModal: { isDeleteModalOpen, openDeleteModal, closeDeleteModal },
    CancelModal: { isCancelModalOpen, openCancelModal, closeCancelModal },
    EditModal: { isEditModalOpen, openEditModal, closeEditModal },
  };
};

export default useNotesModals;
