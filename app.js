const express = require("express");
const config = require("./config");
const router = require("./routes")
const {logger, middlewareLogger} = require('./logger');
  
const init = () => {

  const app = express();
  const port =  config.common.port;
 
  module.exports = app;

  app.use(express.json())


  app.use("/", router)
  app.use(middlewareLogger)

  logger.info(`Started app on http://localhost:${port}`)
  app.listen(port);

};

init();