import Form from "@/app/(user)/login/LoginForm";
import React from "react";

const LoginPage = () => {
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
