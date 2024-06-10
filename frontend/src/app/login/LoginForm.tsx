"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "@/lib/schemas";

export type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (data: LoginFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await handleLogin(data);

    console.log({ res });
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        className="border border-gray-300 p-2 mb-2 rounded-md"
        type="text"
        placeholder="Username"
        {...register("username")}
      />
      <input
        className="border border-gray-300 p-2 mb-2 rounded-md"
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <button className="bg-blue-500 text-white p-2 rounded-lg">Login</button>
    </form>
  );
};
