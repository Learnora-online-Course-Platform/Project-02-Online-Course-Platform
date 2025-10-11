'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'passwordResetToken', { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn('Users', 'passwordResetExpires', { type: Sequelize.DATE, allowNull: true });
    await queryInterface.addColumn('Users', 'emailVerified', { type: Sequelize.BOOLEAN, defaultValue: false });
    await queryInterface.addColumn('Users', 'emailVerificationToken', { type: Sequelize.STRING, allowNull: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'passwordResetToken');
    await queryInterface.removeColumn('Users', 'passwordResetExpires');
    await queryInterface.removeColumn('Users', 'emailVerified');
    await queryInterface.removeColumn('Users', 'emailVerificationToken');
  }
};
