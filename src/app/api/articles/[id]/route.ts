import { UpdateArticleDto } from "@/utils/dtos";
import { articles } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";

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
  const article = articles.find((a) => a.id === Number(id));
  if (!article)
    return NextResponse.json(
      { message: "Article Id not found " },
      { status: 404 }
    );

  return NextResponse.json(article, { status: 200 });
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
  const { id } = await params;
  const body = (await request.json()) as UpdateArticleDto;
  console.log(body);
  const article = articles.find((a) => a.id === Number(id));
  if (!article)
    return NextResponse.json(
      { message: "Article Id not found " },
      { status: 404 }
    );

  return NextResponse.json({ message: "Article Updated" }, { status: 200 });
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
  const { id } = await params;
  console.log("id", id);
  const article = articles.find((a) => a.id === Number(id));
  if (!article)
    return NextResponse.json(
      { message: "Article Id not found " },
      { status: 404 }
    );

  return NextResponse.json({ message: "Article Deleted" }, { status: 200 });
}
