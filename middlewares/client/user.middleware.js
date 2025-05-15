
const User = require('../../models/user.model');
module.exports.infoUser = async (req, res,next) => {
  if(req.cookies.tookenUser){
    const user =  await User.findOne({ tookenUser: req.cookies.tookenUser,deleted: false ,status: "active"}).select("-password ");
    if(user){
        res.locals.user = user;
    }
  }
    next();
}