import { articles } from "@/utils/data";
import { CreateArticleDto } from "@/utils/dtos";
import { Article } from "@/utils/types";
import { createArticleSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";
import z from "zod";

/**
 * @method GET
 * @route ~/api/articles
 * @desc get all articles
 * @access public
 */
export function GET(request: NextRequest) {
  return NextResponse.json(articles, { status: 201 });
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc create new articles
 * @access public
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateArticleDto;

  const validation = createArticleSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    );

  const newArticle: Article = {
    title: body.title,
    body: body.body,
    id: articles.length + 1,
    userId: 200,
  };
  articles.push(newArticle);
  return NextResponse.json(newArticle, { status: 200 });
}
