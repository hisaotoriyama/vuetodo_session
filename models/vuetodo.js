'use strict';
module.exports = (sequelize, DataTypes) => {
  const vuetodotable = sequelize.define('vuetodotable', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    item: DataTypes.STRING
  }, {
    underscored: true,
  });
  vuetodotable.associate = function(models) {
    // associations can be defined here
  };
  return vuetodotable;
};