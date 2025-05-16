const User = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
  // console.log(req.cookies.token);
  if (!req.cookies.tokenUser) {
    res.redirect(`/user/login`);
  } else {
    // console.log(req.cookies.token);
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
    }).select("-password");
    if (!user) {
      res.redirect(`/user/login`);

    } else {
        res.locals.user = user
      next();
    }
  }
};
