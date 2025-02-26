import { prisma } from "@/utils/DB";
import { LoginUserDto } from "@/utils/dtos";
import { loginUserSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCookie } from "@/utils/generateToken";
import { cookies } from "next/headers";

/**
 * @method GET
 * @route ~/api/users/logout
 * @desc Logout user
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    (await cookies()).delete("jwtToken");
    return NextResponse.json({ message: "Logged Out" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server Error  " },
      { status: 500 }
    );
  }
}
