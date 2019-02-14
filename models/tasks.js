'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define(
    'tasks', 
    {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    details: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {});
  tasks.associate = function(models) {
    // associations can be defined here
  };
  return tasks;
};