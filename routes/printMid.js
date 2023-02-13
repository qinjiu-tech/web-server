module.exports = (req, res, next) => {
  next();

  console.log(
    req.path,
    req.method,
    "params:",
    req.params,
    "query:",
    req.query,
    "body:",
    req.body
  );
};
