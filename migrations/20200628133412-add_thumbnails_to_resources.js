'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Resources',
    'Thumbnail',
    {type: Sequelize.STRING}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Resources',
      'Thumbnail'
    );
  }
};
