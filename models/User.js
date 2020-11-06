const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    };
};

// User Table init
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // Validation here requires password to be 8 characters
        validate: {
          len: [8],
        },
      },
    },
    {
      hooks: {
        // Upon new user creation, hash password.
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 12);
          return newUserData;
        },
        // Upon updating user data, hash password
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            12
          );
          return updatedUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "user",
    }
);

module.exports = User;