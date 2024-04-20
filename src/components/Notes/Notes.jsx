import React from "react";
import Note from "../Note/Note.jsx";

function Notes() {
  return (
    <div className="w-[80%] mx-auto h-[calc(100vh-64px)]">
      <form action="" className="py-8 flex justify-center">
        <input
          type="text"
          name="note"
          placeholder="Take a note.."
          className="border border-slate-300 w-[60%] rounded-md px-3 py-2 shadow-lg"
        />
      </form>
      <div className="flex flex-wrap gap-2 items-start">
        <Note
          title={"salah"}
          content={"test test"}
          creationDate={"29 May 2022"}
        />
      </div>
    </div>
  );
}

export default Notes;
