const Blog = require("./blog");
const ReadingList = require("./readingList");
const User = require("./user");

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "usersReading" });

module.exports = {
  Blog,
  User,
  ReadingList,
};
