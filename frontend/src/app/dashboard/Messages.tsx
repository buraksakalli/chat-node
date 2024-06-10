"use client";

import type { JwtPayload } from "jwt-decode";

import { useMessage } from "./useMessage";

import { cn } from "@/utils/cn";

interface User extends JwtPayload {
  id: string;
  username: string;
}

export const Messages = ({
  handleDelete,
  user,
}: {
  handleDelete: (messageId: string) => Promise<boolean>;
  user: User;
}) => {
  const { id: currentUserId, username } = user;

  const { messages, sendMessage, input, setInput, setMessages } = useMessage({
    userId: currentUserId,
    username,
  });

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
                onClick={async () => {
                  const res = await handleDelete(msg._id);

                  if (res) {
                    setMessages((prevMessages) =>
                      prevMessages.filter((m) => m._id !== msg._id)
                    );
                  }
                }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      <form
        onSubmit={sendMessage}
        className="absolute bottom-4 w-full pr-8 flex"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black border-4 border-white/10 rounded-full w-full p-2"
          placeholder="Text Message"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full ml-2 px-8"
        >
          Send
        </button>
      </form>
    </div>
  );
};
