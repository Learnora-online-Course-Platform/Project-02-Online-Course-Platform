'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CourseMaterials', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      type: { type: Sequelize.ENUM('video', 'pdf', 'quiz'), allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      url: { type: Sequelize.STRING, allowNull: false },
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
    await queryInterface.dropTable('CourseMaterials');
  }
};
