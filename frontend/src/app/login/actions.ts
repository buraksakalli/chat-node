import { cookies } from "next/headers";

export const login = async (e: any) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e),
  });

  if (res.ok) {
    const data = await res.json();

    await cookies().set("token", data.token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    return "ok";
  }
};
