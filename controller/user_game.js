const model = require('../models');

module.exports = class User {
    async find(req, res){
        try{
            const data = await model.user_game.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            const result = {
                status: 'ok',
                data: data
            }
    
            res.json(result)
        }catch (error){
            console.log(error)
        }
    }

    async findById(req, res){
        try{
            const{ id } = req.params;
            const data = await model.user_game.findOne({
                where: {
                    id: id,
                }
            });
            const result = {
                status: 'ok',
                data: data
            };
            res.json(result)
        }catch (error){
            console.log(error)
        }
    }

    async create(req, res){
        try{
            const {userName, password} = req.body;

            await model.user_game.create({
                userName: userName,
                password: password
            })

            const data = await model.user_game.findAll();
            const result = {
                status: 'created',
                data: data
            }
    
            res.json(result)
        }catch (error){
            console.log(error)
        }
    }

    async update(req, res){
        try{
            const {userName, password} = req.body;
            const {id} = req.params;
            const data = await model.user_game.findOne({
                where: {
                    id: id,
                }
            });
            data.userName = userName;
            data.password = password;
            await data.save();

            const result ={
                status: 'created',
                data: data
            }

            res.json(result);

        }catch (error){
            console.log(error)
        }
    }

    async delete(req, res){
        try{
            const {id} = req.body;
            const data = await model.user_game.findOne({
                where: {
                    id: id,
                }
            });

            await data.destroy();
            const result = {
                status: 'deleted',
                data: data
            }
    
            res.json(result);
        }catch (error){
            console.log(error)
        }
    }
}