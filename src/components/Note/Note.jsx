import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteStyle from "./note.module.css";

const Note = ({
  title,
  content,
  creationDate,
  backgroundColor,
  handleDeletion,
  updateHandler,
}) => {
  let dateObj = new Date(creationDate);
  let date = dateObj.toLocaleDateString();
  let time = dateObj.toLocaleTimeString();

  return (
    <div
      className={`${NoteStyle.note} px-3 pb-2 pt-1 rounded-lg border border-slate-300 flex flex-col gap-2 min-w-[19.3%]`}
      style={{ backgroundColor: backgroundColor }}
      onClick={updateHandler}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{content}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs flex flex-col gap-1">
          <span>{date}</span>
          <span>{time}</span>
        </p>
        <button onClick={handleDeletion} className={`${NoteStyle.deleteBtn}`}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Note;
