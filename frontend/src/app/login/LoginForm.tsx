"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import { loginSchema } from "@/lib/schemas";
import { cn } from "@/utils/cn";

export type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (data: LoginFormData) => Promise<{ token: string }>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    const res = await handleLogin(data);

    if (res?.token) {
      startTransition(() => {
        router.push("/dashboard");
      });
    } else {
      toast.error("Invalid credentials");
    }
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
      {errors.username && (
        <span className="text-red-500">{errors.username.message}</span>
      )}
      <input
        className="border border-gray-300 p-2 mb-2 rounded-md"
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
      <button
        className={cn("bg-blue-500 text-white p-2 rounded-lg", {
          "opacity-50": isPending,
        })}
      >
        Login
      </button>
      <Toaster />
    </form>
  );
};
