const { z } = require("zod");

const createContractSchema = z.object({
  title: z
    .string({
      message: "Title must be a string",
    })
    .min(3, {
      message: "Title must be at least 3 character",
    })
    .max(100),
  contract: z
    .string({
      message: "Contract must be a text",
    }),

  description: z
    .string({
      message: "Description must be a string",
    })
    .max(1000)
    .optional(),
});


module.exports = createContractSchema
