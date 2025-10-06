const { DataTypes } = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("user_sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable("user_sessions");
  },
};
