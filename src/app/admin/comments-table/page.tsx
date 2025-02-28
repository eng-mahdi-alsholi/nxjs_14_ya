import { getAllComments } from "@/apiCalls/adminApiCall";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteArticleButton from "./DeleteCommentButton";

const CommentsAdminTable = async () => {
  const token = (await cookies()).get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const comments: Comment[] = await getAllComments(token);
  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 text-xl">
          <tr>
            <th className="p-2">Comment </th>
            <th className="hidden p-3 lg:inline-block">Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => {
            return (
              <tr
                key={comment.id}
                className="border-b border-t border-gray-300"
              >
                <td className="p-3 text-gray-700">{comment.title}</td>
                <td className="text-gray-700 p-3 font-mono hidden lg:inline-block ">
                  {new Date(comment.createdAt).toDateString()}
                </td>
                <td>
                  <DeleteArticleButton commentId={comment.id}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default CommentsAdminTable;
