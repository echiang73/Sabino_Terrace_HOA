import React, { Component } from 'react'
import axios from 'axios'


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


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			// firstName: '',
			// lastName: '',
			// username: '',
			// email: '',
			// password: '',
			// confirmPassword: '',


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
			username: '',
			email: {
				...txtFieldState,
				fieldName: "Email",
				required: true,
				requiredTxt: "Email is required",
				formatErrorTxt: "Incorrect email format"
			},
			password: '',
			confirmPassword: '',
			allFieldsValid: false

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
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


	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()


		const form = event.target;

		//we need to extract specific properties in Constraint Validation API using this code snippet
		const formValues = this.reduceFormValues(form.elements);
		const allFieldsValid = this.checkAllFieldsValid(formValues);
		//note: put ajax calls here to persist the form inputs in the database.

		//END

		this.setState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API


		//request to server to add a new username/password
		axios.post('/user/', {
			// username: this.state.username,
			// password: this.state.password
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: (this.state.firstName + this.state.lastName).toLowerCase(),
			email: this.state.email,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {
		const { email, firstName, lastName, username, password, confirmPassword, allFieldsValid } = this.state;
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


		return (
			<div className="SignupForm">
				<h4>Sign up</h4>

				<div style={{ display: successFormDisplay }}>
					<h1 style={{ textAlign: "center" }}>Success!</h1>
					<p style={{ textAlign: "center" }}>
						You have successfully submitted a form.
          			</p>
				</div>


				<form className="form-horizontal"
					className="form-inside-input" onSubmit={this.onSubmit} noValidate
				>
					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="firstName">First Name</label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								type="text"
								id="firstName"
								name="firstName"
								placeholder="First Name"
								required
								value={this.state.firstName}
								onChange={this.handleChange}
							/>
							<br />
							{renderFirstNameValidationError}
							<br />
						</div>
					</div>
					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="lastName">Last Name</label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								type="text"
								id="lastName"
								name="lastName"
								placeholder="Last Name"
								required
								value={this.state.lastName}
								onChange={this.handleChange}
							/>
							<br />
							{renderLastNameValidationError}
							<br />
						</div>
					</div>
					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="email">Email</label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								type="email"
								id="email"
								name="email"
								placeholder="Email Address"
								required
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<br />
							{renderEmailValidationError}
							<br />
						</div>
					</div>
					{/* <div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Username</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
				</div> */}
					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="password">Password: </label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								placeholder="password"
								type="password"
								name="password"
								required
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="password">Confirm Password: </label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								placeholder="Password"
								type="password"
								name="confirmPassword"
								required
								value={this.state.confirmPassword}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="form-group ">
						<div className="col-7"></div>
						<button
							className="btn btn-primary col-1 col-mr-auto"
							onClick={this.handleSubmit}
							type="submit"
						// noValidate // This is to ensure that we’re disabling HTML5 validations by default and access Constraint API programmatically to check for validations. If we enable HTML5 validations, we have little control of the look and feel of error messages and where we should put it.
						>Sign up</button>
					</div>
				</form>
			</div>

		)
	}
}

export default Signup
