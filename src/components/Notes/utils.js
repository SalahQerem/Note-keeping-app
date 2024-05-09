import { InputBase, createTheme, styled } from "@mui/material";
import { toast } from "react-toastify";

export const backgroundColors = [
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

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "5px",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: "0.3",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#000",
        },
      },
    },
  },
});

export const CustomAlert = (message) => {
  toast.success(message, {
    position: "top-left",
    autoClose: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const defualtNote = { title: "", content: "" };
