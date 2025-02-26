import { prisma } from "@/utils/DB";
import { CreateCommentDTO } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/comments
 * @desc create a new comment
 * @access private
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json("Only logged in user", { status: 401 });
    }
    const body = (await request.json()) as CreateCommentDTO;

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        title: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json({ message: " Comment Created " }, { status: 201 });
  } catch (error) {
    return NextResponse.json("Internal Server Error ", { status: 500 });
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @desc get All Comments
 * @access private only Admin
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false)
      return NextResponse.json("Only Admin access denied", { status: 403 });

    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error ", { status: 500 });
  }
}
