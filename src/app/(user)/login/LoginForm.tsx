"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (email == "" || password == "") toast.error("Plz enter email and ");
    router.replace("/");
  };
  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <input
        className="mb-4 border p-2 text-xl"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
      />
      <input
        className="mb-4 border p-2 text-xl"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button
        className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
