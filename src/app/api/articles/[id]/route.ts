import { UpdateArticleDto } from "@/utils/dtos";
import { articles } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@prisma/client";
import { prisma } from "@/utils/DB";
import { verifyToken } from "@/utils/verifyToken";

// interface GetSingleParamsProps {
//   params: { id: string };
// }
// => or

interface GetSingleParamsProps {
  params: { id: string };
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Gel single Article
 */

export async function GET(
  request: NextRequest,
  { params }: GetSingleParamsProps
) {
  const { id } = await params;

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!article)
      return NextResponse.json(
        { message: "Article Id not found " },
        { status: 404 }
      );

    return NextResponse.json(article, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc Edit single Article
 */

export async function PUT(
  request: NextRequest,
  { params }: GetSingleParamsProps
) {
  const userFromToken = verifyToken(request);
  if (userFromToken === null || !userFromToken.isAdmin) {
    return NextResponse.json(
      { message: "Only Admin can edit Article" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const body = (await request.json()) as UpdateArticleDto;

  try {
    const article = prisma.article.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!article)
      return NextResponse.json(
        { message: "Article Id not found " },
        { status: 404 }
      );
    const updated = await prisma.article.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    if (!updated)
      return NextResponse.json(
        { message: "Article Id not Updated " },
        { status: 404 }
      );

    return NextResponse.json(updated, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc Edit single Article
 */

export async function DELETE(
  request: NextRequest,
  { params }: GetSingleParamsProps
) {
  const userFromToken = verifyToken(request);
  if (userFromToken === null || !userFromToken.isAdmin)
    return NextResponse.json(
      { message: "Only Admin can Delete Articles " },
      { status: 403 }
    );

  const { id } = await params;

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!article)
      return NextResponse.json(
        { message: "Article Id not found " },
        { status: 404 }
      );

    const deleteArticle = await prisma.article.delete({
      where: {
        id: Number(id),
      },
    });
    if (!deleteArticle)
      return NextResponse.json(
        { message: "Article Id not Deleted " },
        { status: 404 }
      );

    return NextResponse.json({ message: "Article Deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 }
    );
  }
}
