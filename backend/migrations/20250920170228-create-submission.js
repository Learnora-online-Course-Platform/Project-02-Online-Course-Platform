'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Submissions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      fileUrl: Sequelize.STRING,
      grade: Sequelize.STRING,
      feedback: Sequelize.TEXT,
      assignmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Assignments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Submissions');
  }
};
