const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { globalErrorHandler } = require("./api/utils/error");

const routes = require("./api/routes");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));
  app.use(routes);
  app.use(globalErrorHandler);
  
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
