import { articles } from "@/utils/data";
import { CreateArticleDto } from "@/utils/dtos";
// import { Article } from "@/utils/types";
import { createArticleSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import z, { number } from "zod";
import { Article } from "@prisma/client";
import { prisma } from "@/utils/DB";
import { ARTICLE_PER_PAGE } from "@/utils/constans";
import { verifyToken } from "@/utils/verifyToken";
prisma;

/**
 * @method GET
 * @route ~/api/articles
 * @desc get articles by page Number
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber =
      (await request.nextUrl.searchParams.get("pageNumber")) || "1";
    const newArticle = await prisma.article.findMany({
      skip: (Number(pageNumber) - 1) * ARTICLE_PER_PAGE,
      take: ARTICLE_PER_PAGE,
    });
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
 * @access private (only Admin can create Article)
 */
export async function POST(request: NextRequest) {
  try {
    const userFromToken = verifyToken(request);
    if (userFromToken === null || !userFromToken.isAdmin) {
      return NextResponse.json(
        { message: "Only Admin Can create Post " },
        { status: 403 }
      );
    }
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
