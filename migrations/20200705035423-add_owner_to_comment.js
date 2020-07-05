'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Comments',
      'owner',
      { type: Sequelize.STRING }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Comments',
      'owner'
    )
  }
}
