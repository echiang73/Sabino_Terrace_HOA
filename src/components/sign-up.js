import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Formik } from "formik";
import * as Yup from "yup";
import "./styles.css";
import axios from 'axios'

class Signup extends Component {
  state = {
    redirect: false
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  render() {
    return (
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values);

          //request to server to add a new username/password
          axios.post('/user/', {
            firstName: values.firstName,
            lastName: values.lastName,
            username: (values.firstName + values.lastName).toLowerCase(),
            email: values.email,
            password: values.password
          })
            .then(response => {
              // console.log(response)
              if (!response.data.errmsg) {
                console.log('successful signup')
                this.setState({
                  redirect: true,
                })
              } else {
                console.log('username already taken')
              }
            }).catch(error => {
              console.log('signup error: ')
              console.log(error)
            })
        }}

        //********Using Yum for validation********/
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .required("Required")
            .matches(/(?=.*[a-zA-Z])/, "Please enter a letter"),
          lastName: Yup.string()
            .required("Required")
            .matches(/(?=.*[a-zA-Z])/, "Please enter a letter"),
          email: Yup.string()
            .email("Please enter a valid email")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum")
            .matches(/(?=.*[a-z])/, "Password must contain a lower case letter")
            .matches(/(?=.*[A-Z])/, "Password must contain an upper case letter")
            .matches(/(?=.*[0-9])/, "Password must contain a number")
            .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character (!@#$%^&*)")
            .matches(/(?=.*[0-9])/, "Password must contain a number")
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
            <div>
              <h4 style={{ textAlign: "center" }}>Sign Up</h4>
              <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="firstName">First Name: </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.firstName && touched.firstName && "error"}
                      className="form-input"
                    />
                  </div>
                </div>
                {errors.firstName && touched.firstName && (
                  <div className="input-feedback" style={{ textAlign: "center" }}>{errors.firstName}</div>
                )}

                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="lastName">Last Name: </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.lastName && touched.lastName && "error"}
                      className="form-input"
                    />
                  </div>
                </div>
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback" style={{ textAlign: "center" }}>{errors.lastName}</div>
                )}

                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="email">Email: </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                      className="form-input"
                    />
                  </div>
                </div>
                {errors.email && touched.email && (
                  <div className="input-feedback" style={{ textAlign: "center" }}>{errors.email}</div>
                )}

                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="email">Password: </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
                      className="form-input"
                    />
                  </div>
                </div>
                {errors.password && touched.password && (
                  <div className="input-feedback" style={{ textAlign: "center" }}>{errors.password}</div>
                )}

                <div className="form-group ">
                  <div className="col-7"></div>
                  {this.renderRedirect()}
                  <button type="submit" disabled={isSubmitting}
                    className="btn btn-primary col-1 col-mr-auto"
                  >
                    Signup
              </button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    );
  }
};

export default Signup;
