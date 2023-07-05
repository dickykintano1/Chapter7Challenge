const models = require('../models')

module.exports = {
	async signup (req, res, next) {
		const {username, password} = req.body;
		const registeredUser = await models.user_game.findOne({where: {username: username}});
		if(!username || !password){
			return res.status(400).send('Username and Password required');
		} else if (registeredUser !== null){
			res.send('Username taken!')
		} else {
			models.user_game.register(req.body)
				.then(()=>{
					res.redirect('/login')
				})
				.catch(err => next(err))
		}
	},
	async login (req, res) {
		models.user_game.authenticate(req.body)
			.then(user => {
				req.session.User = user
				// console.log(user)
				if (!req.session.User.username){
					throw new Error('username and password required')
				} else{
					user.generateToken(req);
					console.log({
						success: true,
						username: req.session.User.username,
						message: 'Logged in Successfuly',
						token: "Bearer " + req.session.accessToken
					});
					res.redirect('/');
				}
			}).catch(err=>{
				console.log(err)
				res.json({
					message: err.message
				})
			})
	}
}