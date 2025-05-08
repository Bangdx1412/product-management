module.exports.createPost = (req,res,next)=>{
    // Validate
 if (!req.body.title) {
   req.flash("errors", "Vui lòng nhập tiêu đề");
   res.redirect(req.get("Referrer") || "/");
   return;
 }
 next();
}