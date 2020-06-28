var uuid = require('uuid').v4

module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuid
    },
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.STRING,
    owner: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    visibility: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {})
  Resource.associate = function (models) {
    Resource.hasMany(models.Comment)
    Resource.hasMany(models.Reaction)
    // associations can be defined here
  }
  return Resource
}
