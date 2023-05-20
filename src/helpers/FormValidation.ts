import * as yup from "yup";

const registration = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Must be a valid email.")
    .max(255)
    .required("Email is required."),
  mobilenumber: yup.string().required("Mobile Number is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters long."),
  cpassword: yup
    .string()
    .required("Confrim Password is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

export { registration };
