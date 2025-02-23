import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@/utils/types";
import React from "react";
interface SingleArticlePageProps {
  params: { id: string };
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const { id } = await params;
  console.log(id);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) throw new Error("Failed to  get article ");
  const { title, body }: Article = await response.json();

  return (
    <section className="fix-height container m-auto px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 round ed-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">{title}</h1>
        <div className="text-gray-700">{new Date().getFullYear()}</div>
        <p className="text-gray-800 text-xl mt-5">{body}</p>
      </div>
    </section>
  );
};

export default SingleArticlePage;
