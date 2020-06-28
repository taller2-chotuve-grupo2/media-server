'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Resources', 'Thumbnail', 'thumbnail')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Resources', 'thumbnail', 'Thumbnail')
  }
}
