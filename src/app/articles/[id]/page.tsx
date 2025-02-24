import AddCommentForm from "@/components/comments/AddCommentForm";
import { Article } from "@/utils/types";
import React from "react";

import type { Metadata } from "next";
import CommentItem from "@/components/comments/CommentItem";
let f;
interface SingleArticlePageProps {
  params: { id: string };
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const { id } = await params;
  f = id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) throw new Error("Failed to  get article ");
  const { title, body }: Article = await response.json();

  return (
    <section className="fix-height container  m-auto px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg mb-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">{title}</h1>
        <div className="text-gray-700">{new Date().getFullYear()}</div>
        <p className="text-gray-800 text-xl mt-5">{body}</p>
      </div>
      <AddCommentForm />
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      <CommentItem />
      <CommentItem />
      <CommentItem /> 
    </section>
  );
};

export default SingleArticlePage;

export const metadata: Metadata = {
  title: `Article Page`,
};
