import Form from "@/app/(user)/login/LoginForm";
import axios from "axios";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("jwtToken")?.value;
  // if (token) {
  //   redirect("/");
  // }
  // middleware no need

  return (
    <section className="fix-height container px-7 flex items-center justify-center ">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">log In</h1>
        <Form />
      </div>
    </section>
  );
};

export default LoginPage;
