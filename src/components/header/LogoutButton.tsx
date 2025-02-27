"use client";

import { DOMAIN } from "@/utils/constans";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}api/users/logout`);
      router.push("/");
      router.refresh( )
    } catch (error) {
      toast.warning("Something is Error");
      console.log(error);
    }
  };
  axios.get;
  return (
    <button
      onClick={logoutHandler}
      className="bg-gray-700 text-gray-200 px-1  rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
