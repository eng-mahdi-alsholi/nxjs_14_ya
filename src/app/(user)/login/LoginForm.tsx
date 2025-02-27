"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constans";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email == "" || password == "") toast.error("Plz enter email and ");

    try {
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });
      router.replace("/");
      setLoading(true);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
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
      disabled={loading}
        className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
        type="submit"
      >
        {loading ? <ButtonSpinner />: "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
