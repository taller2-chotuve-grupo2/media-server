'use strict'
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    message: DataTypes.STRING
  }, {})
  Comment.associate = function (models) {
    Comment.belongsTo(models.Resource)

    // associations can be defined here
  }
  return Comment
}
