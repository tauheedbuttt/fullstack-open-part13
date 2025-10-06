const express = require("express");
const blogRouter = express.Router();
const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  return res.json(blog);
});

blogRouter.delete("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (blog) {
    await blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

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
