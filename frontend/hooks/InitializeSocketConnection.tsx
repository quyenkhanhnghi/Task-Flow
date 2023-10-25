"use client";

import { useSocketStore } from "@/context/SocketStore";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function InitializeSocketConnection() {
  const { setSocket } = useSocketStore();

  useEffect(() => {
    const socker = io("http://localhost:4000");
    console.log(socker);
    setSocket(socker);

    return () => {
      socker.disconnect();
    };
  }, [setSocket]);

  return null;
}
