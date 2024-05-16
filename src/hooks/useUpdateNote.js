import { useState } from "react";
import {
  CustomErrorAlert,
  CustomSuccessAlert,
  defaultNote,
} from "../utils/general.js";
import axios from "axios";

const useUpdateNote = (
  fetchNotes,
  page,
  limit,
  setNoteToEdit,
  closeEditModal
) => {
  let [isLoading, setIsLoading] = useState(false);

  const updateNote = async (noteToEdit) => {
    setIsLoading(true);
    try {
      const { _id, title, content } = noteToEdit;
      const res = await axios.put(
        `https://note-keeping-api.onrender.com/notes/${_id}`,
        { title, content }
      );
      if (res.status === 204) {
        CustomSuccessAlert("Your Note successfully updated");
        closeEditModal();
        setNoteToEdit(defaultNote);
        fetchNotes(limit, page);
      }
    } catch (error) {
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateNote, isPending: isLoading };
};

export default useUpdateNote;
