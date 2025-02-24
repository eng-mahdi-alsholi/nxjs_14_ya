"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (email == "" || password == "" || username == "")
      toast.error("Plz enter username , email and password");
    console.log({ username, email, password });
  };
  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <input
        className="mb-4 border p-2 text-xl"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your Username"
      />
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
