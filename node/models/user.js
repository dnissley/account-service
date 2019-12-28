'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  });
  User.associate = function(models) {
    User.hasOne(models.Session);

    User.findByEmail = (email) => User.findOne({ 
      where: { email } 
    });
    
    User.findByAuthToken = (authToken) => User.findOne({
      include: [{ 
        model: models.Session,
        where: { authToken }
      }]
    });
  };
  return User;
};