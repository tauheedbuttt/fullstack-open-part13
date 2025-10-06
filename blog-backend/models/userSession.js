const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class UserSession extends Model {}
UserSession.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    token: DataTypes.STRING,
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user_session",
  }
);
module.exports = UserSession;
