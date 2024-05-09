import axios from "axios";
import { useState } from "react";
import {
  CustomErrorAlert,
  CustomSuccessAlert,
  defaultNote,
} from "../../utils/general.js";

const useAddNote = (fetchNotes, setNewNote, toggleExpandedInputs) => {
  let [isLoading, setIsLoading] = useState(false);

  const addNote = async (note) => {
    setIsAdded(false);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://note-keeping-api.onrender.com/notes",
        { ...note }
      );
      if (res.status === 201) {
        CustomSuccessAlert("New Note successfully Added");
        fetchNotes();
        setNewNote(defaultNote);
        toggleExpandedInputs();
      }
      setIsAdded(true);
    } catch (error) {
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addNote, isPending: isLoading };
};

export default useAddNote;
