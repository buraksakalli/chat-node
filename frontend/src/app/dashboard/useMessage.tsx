"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL as string);

type Message = {
  _id: string;
  message: string;
  timestamp: string;
  userId: string;
  username: string;
};

export const useMessage = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("load messages");

    socket.on("chat history", (messages) => {
      setMessages(messages);
    });

    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat history");
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();

    const message = {
      userId,
      username,
      message: input,
    };

    socket.emit("chat message", message);

    setInput("");
  };

  return {
    sendMessage,
    messages,
    input,
    setInput,
    setMessages,
  };
};
