'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameBiodata.belongsTo(models.user_game, {
        // as: "user_game_biodata",
        constraints:false,
        foreignKey: "userGameId",
      })
    }
  }
  UserGameBiodata.init(
    {
      userGameId: DataTypes.INTEGER,
      fullName: {type: DataTypes.STRING(100), allowNull:true},
      city: {type: DataTypes.STRING(100), allowNull:true},
      birthday: {type: DataTypes.DATE, allowNull:true},
      gender: {type: DataTypes.STRING(10), allowNull:true}
    }, {
      sequelize,
      freezeTableName:true,
      modelName: 'user_game_biodata',
    }
  );
  return UserGameBiodata;
};