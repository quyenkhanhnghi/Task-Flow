"use client";

import { useSocketStore } from "@/context/SocketStore";
import { useEffect, useState } from "react";

interface SocketTestProps {}
export function SocketTest({}: SocketTestProps) {
  const { socket } = useSocketStore();

  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    if (socket) {
      try {
        console.log(socket);
        socket.on("message", (message) => {
          setReceivedMessage(message);
        });
      } catch (error) {}
    }
  }, []);

  const handleSendTestMessage = () => {
    if (socket) {
      socket.emit("testMessage", "This is a test message from frontend");
    }
  };

  return (
    <div>
      <h1>Socket Test with Next.js</h1>
      <button onClick={handleSendTestMessage}>Send Test Message</button>
      <p>{message}</p>
    </div>
  );
}

export default SocketTest;
