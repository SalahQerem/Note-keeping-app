import { useState } from "react";
import { CustomErrorAlert, CustomSuccessAlert } from "../utils/general.js";
import axios from "axios";

const useDeleteNote = (fetchNotes, page, limit, closeDeleteModal) => {
  let [isLoading, setIsLoading] = useState(false);

  const deleteNote = async (noteToEdit) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `https://note-keeping-api.onrender.com/notes/${noteToEdit._id}`
      );
      if (res.status === 204) {
        closeDeleteModal();
        fetchNotes(page, limit);
        CustomSuccessAlert(`${noteToEdit.title} successfully deleted`);
      }
    } catch (error) {
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteNote, isPending: isLoading };
};

export default useDeleteNote;
