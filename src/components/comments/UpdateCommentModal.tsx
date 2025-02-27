import { DOMAIN } from "@/utils/constans";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
interface UpdateModalProps {
  title: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}

const UpdateCommentModal = ({ title, setOpen, id }: UpdateModalProps) => {
  const router = useRouter();
  const [text, setText] = useState(title || "");
  const handleSubmit = async (e: FormEvent) => {
    if (text === "") return toast.info("Please write any comment");
    e.preventDefault();
    try {
      await axios.put(`${DOMAIN}api/comments/${id}`, { text });
      setOpen(false);
      router.refresh();
      setText("");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-11/12 lg: w-2/4  bg-white rounded-lg p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-3xl"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="text-xl rounded-lg p-2 w-full bg-white mb-2 "
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="edit comment ....."
          />
          <button
            className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition"
            type="submit"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
