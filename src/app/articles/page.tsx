import ArticleItem from "@/components/articles/ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@/utils/types";
import next from "next";
import Link from "next/link";
import React from "react";
import Pagination from "./pagination";

const ArticlesPage = async () => {
  await new Promise((res) => setTimeout(res, 1500));
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch articles ....... ");
  }

  const articles: Article[] = await response.json();
  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map((item: Article) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ArticlesPage;
