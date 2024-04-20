import React, { useEffect, useState } from "react";
import Note from "../Note/Note.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backgroundColors = [
    "#FFFFFF",
    "#F0F0F0",
    "#FFFFE0",
    "#87CEEB",
    "#E6E6FA",
    "#FFE5B4",
    "#F5F5DC",
    "#B0E0E6",
    "#FFC0CB",
  ];
  const fetchTodos = async () => {
    const { data } = await axios.get(
      "https://note-keeping-api.onrender.com/notes?limit=10"
    );
    setNotes(data.notes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-[80%] mx-auto h-[calc(100vh-64px)]">
      <form action="" className="my-12 flex justify-center">
        <input
          type="text"
          name="note"
          placeholder="Take a note..."
          className="border border-slate-300 w-[60%] rounded-md px-3 py-2 shadow-lg"
        />
      </form>
      <div className="flex flex-wrap gap-2 items-start">
        {notes.map(({ title, content, createdAt }, index) => {
          return (
            <Note
              key={index}
              title={title}
              content={content}
              creationDate={createdAt}
              backgroundColor={backgroundColors[index % 10]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
