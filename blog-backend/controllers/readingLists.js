const express = require("express");
const readingListRouter = express.Router();
const { Blog, ReadingList } = require("../models");

readingListRouter.post("/", async (req, res) => {
  const { blogId, userId } = req.body;

  const blog = await Blog.findByPk(blogId);
  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }

  const [readingListEntry] = await ReadingList.findOrCreate({
    where: { userId, blogId },
  });

  res.status(201).json(readingListEntry);
});

readingListRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { read } = req.body;

  const readingListEntry = await ReadingList.findOne({
    where: { id, userId: user.id },
  });
  if (!readingListEntry) {
    return res.status(404).json({ error: "reading list entry not found" });
  }

  readingListEntry.read = read;
  await readingListEntry.save();

  res.json(readingListEntry);
});

module.exports = readingListRouter;
