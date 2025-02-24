"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title == "" || description == "")
      toast.error("Plz enter title and description");
    console.log({ title, description });
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
