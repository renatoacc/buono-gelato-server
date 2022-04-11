const isAdmin = (req, res, next) => {
    if ( user && user.userType === "admin") {
      return next();
    }
    return res
      .status(401)
      .json({ errorMessage: "You don't have permissions to acess this area" });
  };
  
  module.exports = isAdmin;