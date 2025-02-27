import ArticleItem from "@/components/articles/ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
// import { Article } from "@/utils/types";
import next from "next";
import Link from "next/link";
import React from "react";
import Pagination from "./pagination";
import { Article } from "@prisma/client";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constans";
let pageNumber = 2;
interface ArticlePageProps {
  searchParams: { pageNumber: string };
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  // await new Promise((res) => setTimeout(res, 500));
  const { pageNumber } = await searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item: Article) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination
        pageNumber={Number(pageNumber)}
        pages={pages}
        router="/articles"
      />
    </section>
  );
};

export default ArticlesPage;
