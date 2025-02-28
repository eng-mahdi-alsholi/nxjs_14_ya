"use client";
import { DOMAIN } from "@/utils/constans";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
interface deleteButtonProps {
  commentId: number;
}

const DeleteCommentButton = ({ commentId }: deleteButtonProps) => {
  const router = useRouter();
  const deleteCommentHandler = async () => {
    try {
      if (confirm("You Want To Delete this Comment?")) {
        await axios.delete(`${DOMAIN}api/comments/${commentId}`);
        router.refresh();
        toast.success("Comment Deleted Successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div
      className="bg-red-600 text-white cursor-pointer rounded-lg inline-block text-center py-1 px-2 hover:bg-red-800 transition"
      onClick={deleteCommentHandler}
    >
      Delete
    </div>
  );
};

export default DeleteCommentButton;
