import { NextRequest, NextResponse } from "next/server";
const articles = [
  {
    id: 1,
    userId: 101,
    title: "typescript",
    body: "typescript is a powerful programming language ",
  },
  {
    id: 2,
    userId: 102,
    title: "C#",
    body: "C# is a powerful programming language ",
  },
  {
    id: 3,
    userId: 103,
    title: "JAVA",
    body: "JAVA is a powerful programming language ",
  },
];

export function GET(request: NextRequest) {
  return NextResponse.json(articles, { status: 201 });
}
