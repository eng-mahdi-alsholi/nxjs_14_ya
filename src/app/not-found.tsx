import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <section className="flex justify-center items-center flex-col fix-height">
        <h1 className="text-7xl text-gray-800 font-bold">404</h1>
        <p className="text-gray-500 text-3xl mt-2 mb-5">Page Not Found</p>
        <Link className="text-xl underline text-blue-700" href="/">
          GO to home Page
        </Link>
      </section>
    </div>
  );
};

export default NotFoundPage;
