import { prisma } from "@/utils/DB";
import { RegisterUserDto } from "@/utils/dtos";
import { createUserSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/users/register
 * @desc Create New User
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const userValidation = createUserSchema.safeParse(body);
    if (!userValidation.success) {
      return NextResponse.json(
        { error: userValidation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user)
      return NextResponse.json(
        { message: "email already exist" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });

    const token = null;

    return NextResponse.json({ ...newUser, token }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server Error  " },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/register
 * @desc Create New User
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server Error  " },
      { status: 500 }
    );
  }
}
