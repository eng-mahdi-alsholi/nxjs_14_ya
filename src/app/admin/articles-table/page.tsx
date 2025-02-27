import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AdminArticleTable = async () => {
  const token = (await cookies()).get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
  return <div>ArticleTable</div>;
};

export default AdminArticleTable;
