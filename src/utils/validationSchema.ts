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

export const createUserSchema = z.object({
  username: z.string().min(2).max(100), // optional
  email: z.string().email(),
  password: z.string().min(6, { message: "Password at least 6 char" }).max(20),
});
export const updateUserSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6, { message: "Password at least 6 char" })
    .max(20)
    .optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password at least 6 char" }).max(20),
});

export const createCommentSchema = z.object({
  text: z
    .string({
      required_error: "text is required ",
    })
    .min(2)
    .max(100),
  articleId: z.number({
    required_error: "articleId is required ",
  }),
});
