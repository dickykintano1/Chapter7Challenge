const models = require('../models')
const passport = require('passport')

module.exports = {
	signup: (req, res, next) => {
		models.user_game.register(req.body)
			.then(()=>{
				res.redirect('/login')
			})
			.catch(err => next(err))
	},

	login: (req, res) => {
		// passport.authenticate(req.body);
		models.user_game.authenticate(req.body)
			.then(user => {
				req.session.User = user
				// console.log(user)
				user.generateToken(req);
				console.log({
					success: true,
					message: 'Logged in Successfuly',
					token: "Bearer " + req.session.accessToken
				});
				res.render('main_menu');
			}).catch(err=>{
				console.log(err)
				res.json({
					message: err.message
				})
			})
	}
}