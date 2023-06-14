'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameHistory.belongsTo(models.user_game, {
        // as: "user_game_history",
        constraints:false,
        foreignKey: "userGameId",
      })
    }
  }
  UserGameHistory.init({
    userGameId: DataTypes.INTEGER,
    time: DataTypes.TIME,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName:true,
    modelName: 'user_game_history',
  });
  
  return UserGameHistory;
};