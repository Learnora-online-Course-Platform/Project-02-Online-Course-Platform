'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quizzes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      question: { type: Sequelize.TEXT, allowNull: false },
      options: { type: Sequelize.JSON, allowNull: false },
      correctAnswer: { type: Sequelize.STRING, allowNull: false },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quizzes');
  }
};
