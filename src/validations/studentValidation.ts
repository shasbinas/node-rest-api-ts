import Joi, { ObjectSchema } from "joi";

// ✅ Allowed classes: 1A–10F (A–F divisions only)
const validClasses: string[] = [];
for (let i = 1; i <= 10; i++) {
  for (const div of ["A", "B", "C", "D", "E", "F"]) {
    validClasses.push(`${i}${div}`);
  }
}

// ✅ CREATE STUDENT VALIDATION
export const createStudentValidation: ObjectSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name too short",
      "string.max": "Name too long",
      "string.pattern.base": "Only letters and spaces allowed",
    }),

  marks: Joi.number().min(0).max(100).required().messages({
    "number.base": "Marks must be a number",
    "number.min": "Marks ≥ 0",
    "number.max": "Marks ≤ 100",
  }),

  class: Joi.string()
    .valid(...validClasses)
    .required()
    .messages({
      "any.only": "Allowed classes: 1A–10F (A–F divisions only)",
      "string.empty": "Class is required",
    }),
});

// ✅ UPDATE STUDENT VALIDATION
export const studentUpdateValidation: ObjectSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
    .min(2)
    .max(50)
    .messages({
      "string.min": "Name too short",
      "string.max": "Name too long",
      "string.pattern.base": "Only letters and spaces allowed",
    }),

  marks: Joi.number().min(0).max(100).messages({
    "number.base": "Marks must be a number",
    "number.min": "Marks ≥ 0",
    "number.max": "Marks ≤ 100",
  }),

  class: Joi.string()
    .valid(...validClasses)
    .messages({
      "any.only": "Allowed classes: 1A–10F (A–F divisions only)",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
