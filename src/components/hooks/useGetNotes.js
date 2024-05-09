import { useState } from "react";
import { CustomErrorAlert } from "../../utils/general.js";
import axios from "axios";

const useGetNotes = (setNotes, setNumOfPages) => {
  let [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async (page = 1, limit = 5) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://note-keeping-api.onrender.com/notes?page=${page}&limit=${limit}`
      );
      setNotes(data.notes);
      setNumOfPages(data.numOfPages);
    } catch (error) {
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchNotes, isFetching: isLoading };
};

export default useGetNotes;
