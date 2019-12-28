'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    authToken: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Session.associate = function(models) {
    Session.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Session;
};