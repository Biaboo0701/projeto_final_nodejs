'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [{
      description: 'JavaScript',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'NodeJS',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'HTML',
      done: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
  }
}