const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User