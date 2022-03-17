import * as yup from "yup";

export const signupSchema = yup
  .object({
    firstName: yup.string().required().min(3).max(20),
    lastName: yup.string().required().min(3).max(20),
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(20),
  })
  .required();
