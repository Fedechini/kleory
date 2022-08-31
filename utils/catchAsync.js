module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

// The funciton returned will be called by Express with the req,res,next arguments
