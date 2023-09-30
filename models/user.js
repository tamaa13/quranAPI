'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/hash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Marking)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username is required'
        },
        notEmpty: {
          args: true,
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already used'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Wrong format email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [8],
          msg: 'Password minimum 8 charackter'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
  })
  return User;
};