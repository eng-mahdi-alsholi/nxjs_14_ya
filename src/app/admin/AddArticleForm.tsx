"use client";
import { DOMAIN } from "@/utils/constans";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (title == "" || description == "")
      toast.error("Plz enter title and description");

    try {
      await axios.post(`${DOMAIN}api/articles/`, {
        title,
        description,
      });
      toast.success("New Article Added Successfully");
      setTitle("");
      setDescription("");

      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <input
        className="mb-4 border p-2 text-xl"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Article title"
      />
      <textarea
        className="mb-4 border p-2 text-xl"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Article description"
      />
      <button
        className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticleForm;
