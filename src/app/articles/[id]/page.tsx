import AddCommentForm from "@/components/comments/AddCommentForm";
// import { Article } from "@/utils/types";
import React from "react";

import type { Metadata } from "next";
import CommentItem from "@/components/comments/CommentItem";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { singleArticle } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

interface SingleArticlePageProps {
  params: { id: string };
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const { id } = await params;
  const article: singleArticle = await getSingleArticle(id);
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  // await new Promise((res) => setTimeout(res, 5000));
  //  console.log('----------',article)
  // const response = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts/${id}`
  // );
  // if (!response.ok) throw new Error("Failed to  get article ");
  // const { title, body }: Article = await response.json();

  return (
    <section className="fix-height container  m-auto px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg mb-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-700">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article.description}</p>
      </div>
      {/* <AddCommentForm articleId={article.id} /> */}
      <div className="mt-7">
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="text-blue-600 md:text-xl ">
            to write comment you should login first
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>

      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
      ))}
    </section>
  );
};

export default SingleArticlePage;

export const metadata: Metadata = {
  title: `Article Page`,
};
