"use client";
import { DOMAIN } from "@/utils/constans";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
interface deleteButtonProps {
  articleId: number;
}

const DeleteArticleButton = ({ articleId }: deleteButtonProps) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("You Want To Delete this Article?")) {
        await axios.delete(`${DOMAIN}api/articles/${articleId}`);
        router.refresh();
        toast.success("Article Deleted Successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div
      className="bg-red-600 text-white cursor-pointer rounded-lg inline-block text-center py-1 px-2 hover:bg-red-800 transition"
      onClick={deleteArticleHandler}
    >
      Delete
    </div>
  );
};

export default DeleteArticleButton;
