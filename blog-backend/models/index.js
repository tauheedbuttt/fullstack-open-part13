const Blog = require("./blog");
const ReadingList = require("./readingList");
const User = require("./user");
const UserSession = require("./userSession");

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "usersReading" });

User.hasMany(UserSession);

module.exports = {
  Blog,
  User,
  ReadingList,
  UserSession,
};
