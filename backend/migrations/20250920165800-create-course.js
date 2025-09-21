'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      category: Sequelize.STRING,
      difficulty: { type: Sequelize.ENUM('beginner', 'intermediate', 'advanced') },
      price: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      thumbnail: Sequelize.STRING,
      instructorId: {
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
    await queryInterface.dropTable('Courses');
  }
};
