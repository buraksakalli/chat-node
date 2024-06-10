import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { Messages } from "./Messages";

export default async function Page() {
  const token = cookies().get("token")?.value;

  const handleDelete = async (messageId: string) => {
    "use server";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messageId }),
      }
    );

    console.log({ response });

    if (response.ok) {
      // setMessages((prevMessages) =>
      //   prevMessages.filter((msg) => msg._id !== messageId)
      // );
    } else {
      console.error("Failed to delete message");
    }
  };

  if (!token) {
    return (
      <div className="container mx-auto p-8">
        Please log in to view this page
      </div>
    );
  }

  const decoded = (await jwtDecode(token)) as { id: string; username: string };

  return (
    <div className="container lg:max-w-[600px] p-8 mx-auto h-screen">
      <div className="outline outline-white/20 h-full p-4 rounded-md relative overflow-y-hidden">
        <h1 className="font-bold text-white text-left text-3xl">Messages</h1>
        <Messages handleDelete={handleDelete} user={decoded} />
      </div>
    </div>
  );
}
