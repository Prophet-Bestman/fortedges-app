import * as yup from "yup";

export const signupSchema = yup
  .object({
    firstName: yup.string().required().min(3).max(20),
    lastName: yup.string().required().min(3).max(20),
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(20),
  })
  .required();

export const signinSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(20),
  })
  .required();

export const forgotPassswordSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: yup
    .string()
    .min(8, "Minimum of 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
      "Password should have at least one upper and lowercase, number and special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  // authCode: yup.string().required("You must enter verification code"),
});

export const changeEmailSchema = yup.object().shape({
  newEmail: yup
    .string()
    .email("Enter a valid emial")
    .required("Email is required"),
});

export const accountStatementSchema = yup.object().shape({
  selectPlan: yup.string().required("You have to select a plan"),
  from: yup.string().required("Select a starting date"),
  to: yup.string().required("Select an ending date"),
});
