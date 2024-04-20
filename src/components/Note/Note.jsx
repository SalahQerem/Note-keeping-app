import React from "react";

function Note({ title, content, creationDate }) {
  return (
    <div className="px-3 py-1 rounded-lg border border-slate-300 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{content}</p>
      <p className="text-xs">{creationDate}</p>
    </div>
  );
}

export default Note;
