"use client";
import Link from "next/link";
import React from "react";
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ArticleErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="pt-7 text-center">
      <div className="text-3xl text-red-600 font-semibold">
        Something went error
      </div>
      <h2 className="text-gray-700 my-3 text-xl ">
        Error Message : {error.message}
      </h2>
      <button
        onClick={() => reset()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Try Again
      </button>
      <Link className="text-xl underline text-blue-700 block mt-6" href="/">
        Go to Home
      </Link>
    </div>
  );
};

export default ArticleErrorPage;
