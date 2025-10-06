const { User } = require("../models");
const { SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  console.log("error.errors", error.errors);
  console.log("error.name", error.name);

  if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map((e) => e.message);
    return response.status(400).send({ error: errors });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    const errors = error.errors.map((e) => e.message);
    return response.status(400).json({ error: errors });
  } else {
    return response.status(500).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (err) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (req.decodedToken) {
    req.user = await User.findByPk(req.decodedToken.id);
  } else {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
