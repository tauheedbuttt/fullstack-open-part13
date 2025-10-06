const express = require("express");
const blogRouter = express.Router();
const { Blog, User } = require("../models");
const { tokenExtractor, userExtractor } = require("../util/middleware");

const blogFinder = async (req, res, next) => {
  const user = req.user;
  console.log("user in blogFinder", user);
  req.blog = await Blog.findOne({
    where: {
      id: req.params.id,
      ...(user ? { userId: user.id } : {}),
    },
  });
  next();
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    order: [["likes", "DESC"]],
    include: { model: User, attributes: { exclude: ["id"] } },
  });
  res.json(blogs);
});

blogRouter.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const user = req.user;
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog);
});

blogRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  blogFinder,
  async (req, res) => {
    const blog = req.blog;
    if (blog) {
      await blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  }
);

blogRouter.put("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (blog) {
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

module.exports = blogRouter;
