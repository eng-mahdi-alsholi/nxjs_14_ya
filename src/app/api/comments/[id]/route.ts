import { prisma } from "@/utils/DB";
import { UpdateCommentDTO } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}
/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc Update Comments
 * @access private only owner of the comment
 */
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found " },
        { status: 404 }
      );
    }

    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you are not allowed to edit comment" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as UpdateCommentDTO;
    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.text,
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc Update Comments
 * @access private only owner of the comment or admin
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found " },
        { status: 404 }
      );
    }

    const user = verifyToken(request);

    if (user === null) {
      return NextResponse.json(
        { message: "you are not allowed to delete comment" },
        { status: 404 }
      );
    }
    if (user.id === comment.userId || user.isAdmin) {
      await prisma.comment.delete({
        where: {
          id: Number(id),
        },
      });
      return NextResponse.json(
        { message: "Comment Deleted Successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "you are not allowed to delete comment" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 }
    );
  }
}
