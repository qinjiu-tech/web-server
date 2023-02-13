const { apiLogger } = require("../logger.js");
const log4js = require("log4js");

// module.exports = (req, res, next) => {
//   console.log(
//     req.path,
//     req.method,
//     "params:",
//     req.params,
//     "query:",
//     req.query,
//     "body:",
//     req.body
//   );
//   next();
//   //   apiLogger.debug(`${req.method} ${req.path} ${req.ip}`);
// };

module.exports = log4js.connectLogger(apiLogger, {
  level: "auto",
});
