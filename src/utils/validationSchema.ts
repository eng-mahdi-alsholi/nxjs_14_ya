import z from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(2, "العنوان اقل شي حرفين يا بخيل").max(200),
  body: z.string().min(10).max(2000),
});
