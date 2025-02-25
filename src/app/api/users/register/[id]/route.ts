import { prisma } from "@/utils/DB";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface GetUserParamsProps {
  params: { id: string };
}

/**
 * @method PUT
 * @route ~/api/users/register/:id
 * @desc Edit User
 */

export async function PUT(
  request: NextRequest,
  { params }: GetUserParamsProps
) {
  const { id } = await params;
  const body = (await request.json()) as UpdateUserDto;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user)
      return NextResponse.json(
        { message: "User Id not found " },
        { status: 404 }
      );
    let hashedPassword;
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(body.password, salt);
    }

    const updated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        ...user,
        ...body,
        password: hashedPassword,
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
 * @route ~/api/users/register/:id
 * @desc Delete User
 */

export async function DELETE(
  request: NextRequest,
  { params }: GetUserParamsProps
) {
  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user)
      return NextResponse.json(
        { message: "User Id not found " },
        { status: 404 }
      );
    const updated = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 }
    );
  }
}
