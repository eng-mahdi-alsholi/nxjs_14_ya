import jwt from "jsonwebtoken";
import { JwtPayloadType } from "./types";

export function generateJWT(JwtPayload: JwtPayloadType): string {
  return jwt.sign(JwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
}
