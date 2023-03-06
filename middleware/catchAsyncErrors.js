module.exports = (theFunc) => (req, res, next) => {
  console.log("next "+next)
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };