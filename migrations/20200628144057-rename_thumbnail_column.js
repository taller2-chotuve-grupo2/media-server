'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Resources', 'Thumbnail', 'thumbnail');
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Resources', 'thumbnail', 'Thumbnail');
  }
};
