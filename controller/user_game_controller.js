const models = require('../models');
// const credentials = require("../data/users.json");
// const UserGameBiodata = require('./user_game_biodata_controller');
// const UserGameHistory = require('./user_game_history_controller');
const jwt = require("jsonwebtoken");
const passport = require("../lib/strategies/passport-jwt");



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

	//signup process
	async signUp(req, res){
		try{
			const {username, password} = req.body;
			const registeredUser = await models.user_game.findOne({where: {username: username}});
			if(!username || !password){
				return res.status(400).send('Username and Password required');
			} else if (registeredUser !== null){
				res.send('Username taken!')
			} else {
				const newUser = await models.user_game.create({
					username: username,
					password: password,
					role: "user"
				})
				// const id = models.user_game.id[models.user_game.length - 1];
				//make initial empty table for biodata and history
				await newUser.save()

				await models.user_game_biodata.create({
					userGameId: newUser.id,
					fullName: null,
					city: null,
					birthday: new Date(0),
					gender: null
				})

				await models.user_game_history.create({
					userGameId: newUser.id,
					time: null,
					score: null
				})
				res.redirect('/login');
			}
				
		}catch (error){
				console.log(error)
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


	//login system
	async doLogin(req,res){
		const { username, password } = req.body;
		const foundIndex = await models.user_game.findOne({where: {username: username}});
		try{
			if (foundIndex == null){
				res.send('user not found');
			} else if (foundIndex.username == username && foundIndex.password == password){
				// req.session.User = foundIndex;
				const payload = {
					id: foundIndex.id,
					username: foundIndex.username,
				};
				const token = jwt.sign(payload, "bebasapapun")
				// res.render("main_menu")
				console.log(token);
			} else {
				res.send('wrong username or password')
			}
		} catch(err){
			res.send(err, 'catch')
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
			data.username = username;
			data.password = password;
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