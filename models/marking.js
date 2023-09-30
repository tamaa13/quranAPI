'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Marking.belongsTo(models.User)
    }
  }
  Marking.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'UserId is required'
        },
        notEmpty: {
          args: true,
          msg: 'UserId is required'
        }
      }
    },
    SurahId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Surah is required'
        },
        notEmpty: {
          args: true,
          msg: 'Surah is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Marking',
  });
  return Marking;
};