const express = require("express");
const authorRouter = express.Router();
const { Blog } = require("../models");
const { sequelize } = require("../util/db");

authorRouter.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    order: [[sequelize.literal("likes"), "DESC"]],
  });
  res.json(authors);
});

module.exports = authorRouter;
