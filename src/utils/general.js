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

export const CustomSuccessAlert = (message) => {
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

export const CustomErrorAlert = (message) => {
  toast.error(message, {
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

export const defaultNote = { title: "", content: "" };
