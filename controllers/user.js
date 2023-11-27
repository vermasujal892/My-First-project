const User = require("../models/user.js");

module.exports.signUpForm = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.login(registerdUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "User Registerd Successfully ✅");
        req.flash("success", "Welcome To WanderLust");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  };

  module.exports.loginSuccess = async (req, res) => {
    req.flash("success", "Welcome To WanderLust You are Logged In");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

  module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "You are Logged Now!");
        res.redirect("/listings");
      }
    });
  };