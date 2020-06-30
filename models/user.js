//user model declaration 
'use strict';
const bcrypt = require('bcrypt');
//declare user model format 
module.exports = function(sequelize, DataTypes) {
  //define user object
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    }, 
    name: {
      type: DataTypes.STRING, 
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    }, 
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99], 
          msg: 'Password is of incorrect length. Double check character number.'
        }
      }
    }
  }, {
    hooks: {
      //before record creation
      beforeCreate: function(createdUser, options) {
        //take inputted password 
        if (createdUser && createdUser.password) {
          let hash = bcrypt.hashSync(createdUser.password, 12);
          createdUser.password = hash;
        }
      } 
    }
  });
  user.associate = function(models) {
    //TODO: any user associate you want
  }
  //runs a function that compares the typed password and the hashed password to compare
  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password)
  }

  //remove password for any serialization of User object
  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return user;
};

//take inputed password and compare to hashed password in user table 
//hash new password to add to user table 
// return user model
