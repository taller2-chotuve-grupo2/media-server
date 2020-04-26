const express = require("express");
const path = require("path");
const config = require("./config");
const homeRoutes = require("./routes")
const logger = require('./logger');
  
const init = () => {

  const app = express();
  const port =  config.common.port;
 
  module.exports = app;

  app.use("/", homeRoutes)

  // app.use(errors.handle);
  logger.info(`started app on port ${port}`)
  app.listen(port);

  // logger.info(`Listening on port: ${port}`);
};

init();