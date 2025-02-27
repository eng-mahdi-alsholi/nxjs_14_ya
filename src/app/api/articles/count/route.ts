// searchText=java

import { prisma } from "@/utils/DB";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/count
 * @desc Get Article Number
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal  server error" },
      { status: 500 }
    );
  }
}
