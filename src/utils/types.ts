import { Article, Comment, User } from "@prisma/client";

export type JwtPayloadType = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export type CommentWithUser = Comment & { user: User };
export type singleArticle = Article & { comments: CommentWithUser[] };
