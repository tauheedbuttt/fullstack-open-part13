const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { User, UserSession } = require("../models");
const { tokenExtractor, userExtractor } = require("../util/middleware");

router.post("/login", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  const userSession = UserSession.build({ userId: user.id, token });
  await userSession.save();

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

router.delete(
  "/logout",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { user, token } = request;

    if (!user || !token) {
      return response.status(401).json({ error: "token missing" });
    }

    const session = await UserSession.findOne({
      where: { userId: user.id, token },
    });

    if (session) {
      await session.destroy();
    }

    response.status(204).end();
  }
);

module.exports = router;
