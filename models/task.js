'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
    }
  };
  Task.init({
    description: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task'
  })
  return Task
};