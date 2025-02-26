import { prisma } from "@/utils/DB";
import { RegisterUserDto } from "@/utils/dtos";
import { createUserSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateJWT } from "@/utils/generateToken";
import { JwtPayloadType } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: { id: string };
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Create New User
 * @access private (only user himself)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User nor Found" }, { status: 404 });
    }

    // const authToken = (await request.headers.get("authtoken")) as string; // old

    // const jwtToken = await request.cookies.get("jwtToken");
    // const token = jwtToken?.value as string;

    // const userFromToken = jwt.verify(
    //   token,
    //   process.env.JWT_SECRET as string
    // ) as JwtPayloadType;
    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      await prisma.user.delete({ 
        where: {
          id: Number(id),
        },
      });
      return NextResponse.json({ message: "User Deleted " }, { status: 200 });
    }

    return NextResponse.json({ message: "Only User himself" }, { status: 403 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server Error  " },
      { status: 500 }
    );
  }
}
