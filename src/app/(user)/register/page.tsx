import React from "react";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const RegisterPage = async () => {
  // const token = await cookies().get("jwtToken")?.value; // error
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;
  
  if (token) {
    redirect("/");
  }
  return (
    <section className="fix-height container px-7 flex items-center justify-center ">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">
          create New Account
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
