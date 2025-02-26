import jwt from "jsonwebtoken";
import { JwtPayloadType } from "./types";
import { serialize } from "cookie";

export function generateJWT(JwtPayload: JwtPayloadType): string {
  return jwt.sign(JwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
}

export function setCookie(jwtPayLoad: JwtPayloadType): string {
  const token = generateJWT(jwtPayLoad);
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // development = http , production =https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return cookie;
}
