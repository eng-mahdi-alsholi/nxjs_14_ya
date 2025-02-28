import { DOMAIN } from "@/utils/constans";
import { Comment } from "@prisma/client";
// Get All comments 
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed To Load Data ");
  return await response.json();
}
