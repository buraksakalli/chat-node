"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import type { JwtPayload } from "jwt-decode";

import { cn } from "@/utils/cn";

const socket = io(process.env.NEXT_PUBLIC_API_URL as string);

type Message = {
  _id: string;
  message: string;
  timestamp: string;
  userId: string;
  username: string;
};

interface User extends JwtPayload {
  id: string;
  username: string;
}

export const Messages = ({
  handleDelete,
  user,
}: {
  handleDelete: (messageId: string) => void;
  user: User;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const currentUserId = user?.id;
  const username = user?.username;

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
      userId: currentUserId,
      username,
      message: input,
    };
    socket.emit("chat message", message);
    setInput("");
  };

  return (
    <div className="text-white mt-10 overflow-hidden">
      <ul className="pb-10 flex flex-col gap-4 overflow-y-scroll">
        {messages.map((msg) => (
          <li
            className={cn(
              "rounded-full bg-white/10 p-1 px-4 self-start space-x-2",
              {
                "self-end bg-blue-500": msg.userId === currentUserId,
              }
            )}
            key={msg._id}
          >
            {msg.userId !== currentUserId && (
              <span className="text-xs">{msg.username}</span>
            )}
            <span className="text-sm">{msg.message}</span>
            {msg.userId === currentUserId && (
              <button
                className="text-xs"
                onClick={async () => handleDelete(msg._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={sendMessage} className="absolute bottom-4 w-full pr-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black border-4 border-white/10 rounded-full w-full p-2"
          placeholder="Text Message"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full p-2 ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};
