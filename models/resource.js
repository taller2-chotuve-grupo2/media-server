module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.STRING,
    owner: DataTypes.STRING
  }, {})
  Resource.associate = function (models) {
    Resource.hasOne(models.Metadata)
    Resource.hasMany(models.Comment)
    Resource.hasMany(models.Reaction)
    // associations can be defined here
  }
  return Resource
}
