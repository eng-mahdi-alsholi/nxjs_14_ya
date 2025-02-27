import AddCommentForm from "@/components/comments/AddCommentForm";
// import { Article } from "@/utils/types";
import React from "react";

import type { Metadata } from "next";
import CommentItem from "@/components/comments/CommentItem";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { singleArticle } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

const Loading = async () => {
  return (
    <section className="fix-height container  m-auto px-5 pt-8 md:w-3/4 animate-pulse">
      <div className="bg-white p-7 rounded-lg mb-7 h-40">
        <h1 className="bg-gray-300 mb-2"></h1>
        <div className="bg-gray-300"></div>
        <p className="bg-gray-300   mt-5"> </p>
      </div>
      <form>
        <input className="rounded-lg   p-2 w-full bg-gray-200 " type="text" />
        <button className="bg-green-200  mt-2 p-1 w-min   rounded-lg hover:bg-green-300 transition">
          Comment
        </button>
      </form>
      <div className="mt-7"></div>
      <h4 className="bg-gray-200 ps-1   mb-2 mt-7">Comments</h4>

      <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300  ">
        <div className="flex items-center justify-between mb-2">
          <strong className="text-gray-800 uppercase"></strong>
          <span className="bg-yellow-700 px-1 rounded-lg text-white "></span>
        </div>
        <p className="bg-gray-200 mb-2"> </p>
      </div>
    </section>
  );
};

export default Loading;
