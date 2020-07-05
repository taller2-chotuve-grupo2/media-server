module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    status: DataTypes.STRING,
    owner: DataTypes.STRING
  }, {})
  Reaction.associate = function (models) {
    Reaction.belongsTo(models.Resource)
    // associations can be defined here
  }
  return Reaction
}
