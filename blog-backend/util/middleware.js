const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  console.log("error.name", error.name);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
