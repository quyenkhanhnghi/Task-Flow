import { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStoreProps {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

export const useSocketStore = create<SocketStoreProps>((set) => ({
  socket: null,
  setSocket: (socket) =>
    set(() => ({
      socket,
    })),
}));
