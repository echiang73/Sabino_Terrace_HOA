import React from "react";
import ReactDOM from "react-dom";

// import "./styles.css";

const txtFieldState = {
  value: "",
  valid: true,
  typeMismatch: false,
  errMsg: "" //this is where our error message gets across
};

const ErrorValidationLabel = ({ txtLbl }) => (
  <label htmlFor="" style={{ color: "red" }}>
    {txtLbl}
  </label>
);

class Signup extends React.Component {
  state = {

    firstName: {
      ...txtFieldState,
      fieldName: "First Name",
      required: true,
      requiredTxt: "First Name is required"
    },
    lastName: {
      ...txtFieldState,
      fieldName: "Last Name",
      required: false,
      requiredTxt: "Last Name is required"
    },
    email: {
      ...txtFieldState,
      fieldName: "Email",
      required: true,
      requiredTxt: "Email is required",
      formatErrorTxt: "Incorrect email format"
    },
    password: {
      ...txtFieldState,
      fieldName: "Password",
      required: true,
      requiredTxt: "Password is required",
      formatErrorTxt: "Incorrect password format"
    },
    allFieldsValid: false
  };

  reduceFormValues = formElements => {
    const arrElements = Array.prototype.slice.call(formElements); //we convert elements/inputs into an array found inside form element

    //we need to extract specific properties in Constraint Validation API using this code snippet
    const formValues = arrElements
      .filter(elem => elem.name.length > 0)
      .map(x => {
        const { typeMismatch } = x.validity;
        const { name, type, value } = x;

        return {
          name,
          type,
          typeMismatch, //we use typeMismatch when format is incorrect(e.g. incorrect email)
          value,
          valid: x.checkValidity()
        };
      })
      .reduce((acc, currVal) => {
        //then we finally use reduce, ready to put it in our state
        const { value, valid, typeMismatch, type } = currVal;
        const { fieldName, requiredTxt, formatErrorTxt } = this.state[
          currVal.name
        ]; //get the rest of properties inside the state object

        //we'll need to map these properties back to state so we use reducer...
        acc[currVal.name] = {
          value,
          valid,
          typeMismatch,
          fieldName,
          requiredTxt,
          formatErrorTxt
        };

        return acc;
      }, {});

    return formValues;
  };

  checkAllFieldsValid = formValues => {
    return !Object.keys(formValues)
      .map(x => formValues[x])
      .some(field => !field.valid);
  };

  onSubmit = event => {
    event.preventDefault();
    const form = event.target;

    //we need to extract specific properties in Constraint Validation API using this code snippet
    const formValues = this.reduceFormValues(form.elements);
    const allFieldsValid = this.checkAllFieldsValid(formValues);
    //note: put ajax calls here to persist the form inputs in the database.

    //END

    this.setState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
  };

  render() {
    const { firstName, lastName, email, password, allFieldsValid } = this.state;
    const successFormDisplay = allFieldsValid ? "block" : "none";
    const inputFormDisplay = !allFieldsValid ? "block" : "none";

    const renderFirstNameValidationError = firstName.valid ? (
      ""
    ) : (
        <ErrorValidationLabel txtLbl={firstName.requiredTxt} />
      );
    const renderLastNameValidationError = lastName.valid ? (
      ""
    ) : (
        <ErrorValidationLabel txtLbl={lastName.requiredTxt} />
      );
    const renderEmailValidationError = email.valid ? (
      ""
    ) : (
        <ErrorValidationLabel txtLbl={email.typeMismatch ? email.formatErrorTxt : email.requiredTxt} />
      );
    const renderPasswordValidationError = password.valid ? (
      ""
    ) : (
        <ErrorValidationLabel txtLbl={password.typeMismatch ? password.formatErrorTxt : password.requiredTxt} />
      );

    // function checkPassword(str) {
    //   var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    //   return regexPassword.test(str);
    // }

    return (
      <div>
        <div style={{ display: successFormDisplay }}>
          <h1 style={{ textAlign: "center" }}>Success!</h1>
          <p style={{ textAlign: "center" }}>
            You have successfully submitted a form.
          </p>
        </div>
        <div className="form-input" style={{ display: inputFormDisplay, border: "none" }}>
          <h3 style={{ textAlign: "center" }}>Homeowner Sign Up Form</h3>
          <form className="form-inside-input" onSubmit={this.onSubmit} noValidate >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required pattern="[A-Za-z']+"
            />
            <br />
            {renderFirstNameValidationError}
            <br />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required pattern="[A-Za-z']+"
            />
            <br />
            {renderLastNameValidationError}
            <br />
            <input type="email" name="email" placeholder="Email" required />
            <br />
            {renderEmailValidationError}
            <br />
            <input type="password" name="password" placeholder="Password" required 
            // pattern="[/^(?=.*\d)(?=.*[!@#$%*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/]+" 
            />
            <br />
            {renderPasswordValidationError}
            <br />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
