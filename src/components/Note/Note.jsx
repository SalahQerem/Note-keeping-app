import React from "react";

function Note({ title, content, creationDate, backgroundColor }) {
  let dateObj = new Date(creationDate);
  let date = dateObj.toLocaleDateString();
  let time = dateObj.toLocaleTimeString();

  return (
    <div
      className="px-3 py-1 rounded-lg border border-slate-300 flex flex-col gap-3 min-w-[155px]"
      style={{ backgroundColor: backgroundColor }}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{content}</p>
      <p className="text-xs flex gap-3">
        <span>{date}</span>
        <span>{time}</span>
      </p>
    </div>
  );
}

export default Note;
