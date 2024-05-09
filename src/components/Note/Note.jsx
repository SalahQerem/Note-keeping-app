import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteStyle from "./note.module.css";
import { Box, Button, Typography } from "@mui/material";

const Note = ({
  title,
  content,
  creationDate,
  backgroundColor,
  deleteHandler,
  updateHandler,
}) => {
  let dateObj = new Date(creationDate);
  let date = dateObj.toLocaleDateString();
  let time = dateObj.toLocaleTimeString();

  return (
    <Box
      className={`${NoteStyle.note} px-3 pb-2 pt-1 rounded-lg border border-slate-300 flex flex-col gap-2 w-[19.3%]`}
      style={{ backgroundColor: backgroundColor }}
      onClick={updateHandler}
    >
      <Typography variant="h2" className="text-lg font-semibold">
        {title}
      </Typography>
      <Typography variant="body2">{content}</Typography>
      <Box className="flex items-center justify-between">
        <Typography className="text-xs flex flex-col">
          <Typography component={"span"} variant="body2">
            {date}
          </Typography>
          <Typography component={"span"} variant="body2">
            {time}
          </Typography>
        </Typography>
        <Button
          color="inherit"
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            deleteHandler();
          }}
          className={`${NoteStyle.deleteBtn} bg-transparent min-w-1`}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Note;
