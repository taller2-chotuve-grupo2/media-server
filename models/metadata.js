module.exports = (sequelize, DataTypes) => {
  const Metadata = sequelize.define('Metadata', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    visibility: DataTypes.STRING
  }, {})
  Metadata.associate = function (models) {
    Metadata.belongsTo(models.Resource)
    // associations can be defined here
  }
  return Metadata
}
