const models = require('../models');
const jwt = require("jsonwebtoken");

module.exports = class User {
	async allUsers(req, res){
		try{
			const data = await models.user_game.findAll({
				order: [
					['id', 'ASC']
				],
				include: [{model: models.user_game_history}, {model: models.user_game_biodata}]
			});
			const result = {
				status: 'ok',
				data: data
			}

			res.json(result)
		}catch (error){
			console.log(error)
		}
	}

	async showOneUser(req,res){
		try{
			const id = parseInt(Object.values(req.params));
			const userData = await models.user_game.findOne({where:{id: id}})
			return res.render("user_data_page", {
				data: userData,
			});

		}catch (error){
			console.log(error)
		}
	}
	

	async userPage(req, res) {
		const { id, role } = req.session.User;
		const allUsersData = await models.user_game.findAll();
		const history = await models.user_game_history.findOne({where:{userGameId: id}});
		const biodata = await models.user_game_biodata.findOne({where:{userGameId: id}});
		if (role == "user") {
			console.log('user attempt to home')
			return res.render("user_page", {
				data: req.session.User,
				biodata: biodata,
				history: history,
			});
		} else {
			return res.render("admin_page", {
				data: req.session.User,
				userData: allUsersData,
			});
		}
	}

	async mainMenu(req, res){
		try{
			res.render("main_menu");
				
		}catch (error){
			console.log(error)
		}
}

	async gamePage(req,res){
		try{
			res.render("game");
		}catch (error){
			console.log(error)
		}
	}

	//create or signup new user
	async signUpPage(req, res) {
		if(req.session.User){
			return res.render("main_menu");
		}else{
			return res.render("signup");
		}
	}

	//login page
	async loginPage(req, res) {
		if (req.User) {
			res.render("main_menu");
		} else {
			res.render("login");
		}
	}

	//logout
	async logout(req, res) {
		req.session.destroy(() => {
			return res.redirect("/login");
		});

		}

	async update(req, res){
		try{
			const {id} = req.params;
			const data = await models.user_game.findOne({
				where: {
					id: id,
				}
			});
			data.username = req.username;
			data.password = req.password;
			await data.save();
			res.redirect("/user");

		}catch (error){
			console.log(error)
		}
	}

	async delete(req, res){
		try{
			const {id} = req.params;
			const data = await models.user_game.findOne({
				where: {
					id: id,
				}
			});

			await data.destroy();
			res.redirect("/user");
		}catch (error){
			console.log(error)
		}
	}

	// async tests(req,res){
	//     const data = models.user_game.user_game_biodata
	//     console.log(data);
	// }
}