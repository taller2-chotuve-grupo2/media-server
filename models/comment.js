var uuid = require('uuid').v4

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuid
    },
    message: DataTypes.STRING
  }, {})
  Comment.associate = function (models) {
    Comment.belongsTo(models.Resource)

    // associations can be defined here
  }
  return Comment
}
