import { prisma } from "@/utils/DB";
import { LoginUserDto } from "@/utils/dtos";
import { loginUserSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/users/login
 * @desc login user
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const userValidation = loginUserSchema.safeParse(body);
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
    if (!user)
      return NextResponse.json(
        { message: "invalid email  or password" },
        { status: 400 }
      );

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch)
      return NextResponse.json(
        { message: "invalid email  or password" },
        { status: 400 }
      );

    const token = null;
    const { email, username, isAdmin } = user;

    return NextResponse.json(
      { email, username, isAdmin, token },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server Error  " },
      { status: 500 }
    );
  }
}
