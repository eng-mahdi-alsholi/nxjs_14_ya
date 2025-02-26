import { prisma } from "@/utils/DB";
import { RegisterUserDto, UpdateUserDto } from "@/utils/dtos";
import { createUserSchema, updateUserSchema } from "@/utils/validationSchema";
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
      include: {
        comments: true,
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
      // delete the user
      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      // delete the comment that belong to this user
      const commentIds: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({
        where: {
          id: { in: commentIds },
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

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc Get Profile By id
 * @access private (only user himself)
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User not Found  " },
        { status: 404 }
      );
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken?.id !== user.id) {
      return NextResponse.json(
        { message: "No token , or not valid token ,access denied  " },
        { status: 403 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error  " },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update Profile By id
 * @access private (only user himself)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not Found " }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken?.id !== user.id) {
      return NextResponse.json(
        { message: "No token , or not valid token ,access denied  " },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateUserDto;
    const validate = updateUserSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(
        { message: validate.error.errors[0].message },
        { status: 400 }
      );
    }

    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json(
          { message: "Password Must be At least 6 Characters " },
          { status: 400 }
        );
      }
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updateUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error  " },
      { status: 500 }
    );
  }
}
