'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGame.hasOne(models.user_game_biodata, {
        constraints: false,
        foreignKey: "userGameId"
      })
      UserGame.hasMany(models.user_game_history, {
        constraints: false,
        foreignKey: "userGameId"
      })
    }

    static #encrypt = (password) => bcrypt.hashSync (password, 10)
    static register = ({username, password}) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({username, password: encryptedPassword})
    }

    checkPassword = password => {
      return bcrypt.compareSync(password, this.password)
      // console.log(password + ' ' + this.password)
    }

    generateToken = function (req) {
      const payload = {
        id: this.id,
        username: this.username
      }

      const rahasia = "ini rahasia"
      const token = jwt.sign(payload, rahasia)
      req.session.accessToken = token
    }

    static authenticate = async ({username,password}) => {
      try {
        const user = await this.findOne({where: {username}})
        if (!user) throw new Error("user not found")

        const isPasswordValid = user.checkPassword (password)
        if (!isPasswordValid) throw new Error("Wrong Password")

        return (user)
      }
      catch(err){throw (err)}
    }
    
  }
  UserGame.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return UserGame;
};