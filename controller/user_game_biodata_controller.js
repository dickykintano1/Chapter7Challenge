const models = require('../models');

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

// function formatDate(date) {
//     return [
//       date.getFullYear(),
//       padTo2Digits(date.getMonth() + 1),
//       padTo2Digits(date.getDate()),
//     ].join('-');
// }

module.exports = class UserGameBiodata {
    async edit(req, res) {
        const { id } = req.params;
        const biodata = await models.user_game_biodata.findOne({where:{userGameId: id}})
        // biodata.birthday = formatDate(biodata.birthday)
        const userGame = await models.user_game.findOne({
          where: {
            id: id,
          },
        });
        
        res.render("edit_biodata", {
          data: userGame,
          biodata: biodata
        });
    }

    async update(req,res){
        const id = parseInt(Object.values(req.params));
        const {username, password, fullName, birthday, city, gender} = req.body;
        //allows user to change username and password
        await models.user_game.update(
            {
                username: username,
                password: password,
            },
            {where:{id}}
        );
        const checkUserGameId = await models.user_game_biodata.findOne({where:{userGameId: id}})
        
        if (checkUserGameId === null){
            await models.user_game_biodata.create({
                userGameId: id,
                fullName: fullName,
                birthday: birthday,
                city: city,
                gender: gender
            })
        } else {
            await models.user_game_biodata.update(
                {
                    fullName: fullName,
                    birthday: birthday,
                    city: city,
                    gender: gender,
                },{where:{userGameId: id}}
            )
        }
        
        const data = await models.user_game.findOne({where:{id: id}})
        const biodata = await models.user_game_biodata.findOne({where:{userGameId: id}})
        // console.log('HERE ---->', biodata.birthday)
        return res.render("user_page", {
            data: data,
            biodata: biodata
          });
    }

}