export type Article = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type JwtPayloadType = {
  id: number;
  isAdmin: boolean;
  username: string;
};
