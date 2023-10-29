import { create } from "zustand";

interface SnackbarType {
  snackbarContent: SnackMessageType;
  setSnackbarContent: (content: Omit<SnackMessageType, "open">) => void;
  closeSnackBar: () => void;
}

export const useSnackbar = create<SnackbarType>((set) => ({
  snackbarContent: {
    title: "",
    message: "",
    type: "success",
    open: false,
  },
  setSnackbarContent: (content) =>
    set({ snackbarContent: { ...content, open: true } }),
  closeSnackBar: () =>
    set(({ snackbarContent }) => ({
      snackbarContent: {
        ...snackbarContent,
        open: false,
      },
    })),
}));

export type SnackMessageType = {
  title: string;
  message: string;
  type: "success" | "error";
  open: boolean;
};
