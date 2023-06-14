'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userGameId: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      freezeTableName: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_history');
  }
};