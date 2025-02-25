import { articles } from "@/utils/data";
import { CreateArticleDto } from "@/utils/dtos";
// import { Article } from "@/utils/types";
import { createArticleSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { Article } from "@prisma/client";
import { prisma } from "@/utils/DB";
prisma;

/**
 * @method GET
 * @route ~/api/articles
 * @desc get all articles
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const newArticle = await prisma.article.findMany();
    return NextResponse.json(newArticle, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc create new articles
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 }
    );
  }
}
