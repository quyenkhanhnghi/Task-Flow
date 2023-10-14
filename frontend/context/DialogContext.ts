import { create } from "zustand";

interface DialogContext {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export const useDialogContext = create<DialogContext>((set) => ({
  isOpen: false,
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
}));
