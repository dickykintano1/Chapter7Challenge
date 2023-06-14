const models = require('../models');

module.exports = class UserGameHistory {
    async list(req, res){
        try{
            const data = await models.user_game_history.findAll({
                order: [
                    ['id', 'ASC']
                ],
            })
            const result = {
                status: 'ok',
                data: data
            }
    
            res.json(result)
            // console.log(typeof models.user_game_history)
        }catch (error){
            console.log(error)
        }
    }
}