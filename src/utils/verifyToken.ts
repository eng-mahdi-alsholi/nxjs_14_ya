import jwt from "jsonwebtoken";
import { JwtPayloadType } from "./types";
import { NextRequest } from "next/server";

export function verifyToken(request: NextRequest): JwtPayloadType | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;

    const userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadType;
    return userPayload;
  } catch (e) {
    return null;
  }
}
