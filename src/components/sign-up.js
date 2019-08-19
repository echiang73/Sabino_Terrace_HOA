import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./styles.css";

const Signup = () => (
  <Formik
    initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      // setTimeout(() => {
      //   console.log("Logging in", values);
      //   setSubmitting(false);
      // }, 500);
      console.log("Submitting");
      // console.log(values);
    }}
    
    //********Using Yum for validation********/

    validationSchema={Yup.object().shape({
      firstName: Yup.string()
        .required("Required")
        .matches(/(?=.*[a-zA-Z])/, "Please enter a letter."),
      lastName: Yup.string()
        .required("Required"),
      email: Yup.string()
        .email("Please enter a valid email.")
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[a-z])/, "Password must contain a lower case letter.")
        .matches(/(?=.*[A-Z])/, "Password must contain an upper case letter.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character (!@#$%^&*).")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
      // .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName && touched.firstName && "error"}
          />
          {errors.firstName && touched.firstName && (
            <div className="input-feedback">{errors.firstName}</div>
          )}
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastName && touched.lastName && "error"}
          />
          {errors.lastName && touched.lastName && (
            <div className="input-feedback">{errors.lastName}</div>
          )}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
      );
    }}
  </Formik>
);

export default Signup;
