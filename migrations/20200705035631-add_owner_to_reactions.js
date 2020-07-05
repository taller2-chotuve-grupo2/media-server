'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Reactions',
      'owner',
      { type: Sequelize.STRING }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Reactions',
      'owner'
    )
  }
}
