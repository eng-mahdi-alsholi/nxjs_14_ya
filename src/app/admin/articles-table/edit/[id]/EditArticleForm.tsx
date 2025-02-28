"use client";
import { DOMAIN } from "@/utils/constans";
import { Article } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (title == "" || description == "")
      toast.error("Plz enter title and description");

    try {
      await axios.put(`${DOMAIN}api/articles/${article.id}`, {
        title,
        description,
      });
      toast.success("Article Updated Successfully");
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
      />
      <textarea
        className="mb-4 border p-2 text-xl"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold"
        type="submit"
      >
        Edit
      </button>
    </form>
  );
};

export default EditArticleForm;
