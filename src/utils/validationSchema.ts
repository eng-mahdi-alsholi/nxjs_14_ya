import z from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "Just string",
    })
    .min(2, "العنوان اقل شي حرفين يا بخيل")
    .max(100, { message: "Max is 100" }),
  description: z.string().min(10).max(2000),
});
