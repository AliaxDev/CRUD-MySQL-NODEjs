const { z } = require("zod");

const signupSchema = z
  .object({
    fullname: z
      .string({
        required_error: "Fullname is required",
      })
      .min(3, {
        message: "Fullname must be at least 3 characters long",
      }),

    username: z
      .string({
        required_error: "Username is required",
      })
      .min(6, {
        message: "Username must be at least 6 characters long",
      }),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

const signinSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(6, {
      message: "Username must be at least 6 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

module.exports = {
  signupSchema,
  signinSchema
}