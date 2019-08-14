const User = require('../database/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		// usernameField: 'username' // not necessary, DEFAULT
		usernameField: 'email' // not necessary, DEFAULT
	},
	// function(username, password, done) {
	function(email, password, done) {
		// User.findOne({ username: username }, (err, user) => {
		User.findOne({ email: email }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect login or password' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect login or password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy
