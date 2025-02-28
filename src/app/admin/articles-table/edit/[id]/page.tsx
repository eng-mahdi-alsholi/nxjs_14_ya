// "use client";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { DOMAIN } from "@/utils/constans";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";
import { toast } from "react-toastify";
import EditArticleForm from "./EditArticleForm";
interface editArticlePageProps {
  params: { id: string };
}

const EditArticlePage = async ({ params }: editArticlePageProps) => {
  const token = (await cookies()).get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload =await verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const { id } = await params;
  const article: Article = await getSingleArticle(id);
  console.log(article);

  return (
    <section className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-2xl text-green-700 font-semibold mb-4">
          Edit Article
        </h2>
        <EditArticleForm article={article} />
      </div>
    </section>
  );
};

export default EditArticlePage;
