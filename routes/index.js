var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

//HOME PAGE ROUTE
router.get("/", function (req, res) {
	res.render("landing");
});

//REGISTER FORM ROUTE
router.get("/register", function (req, res) {
	res.render("register");
});

//REGISTER POST ROUTE
router.post("/register", function (req, res) {
	var newUser = new User({
		username: req.body.username
	});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			req.flash("error", err.message);
			return res.render("/register");
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success", "You have successfully signed up!");
			res.redirect("/campgrounds");
		});
	});
});

//LOGIN FORM ROUTE
router.get("/login", function (req, res) {
	res.render("login");
});

//LOGIN POST/AUTHENTICATE ROUTE
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function (req, res) {});

//LOGOUT ROUTE
router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "You have successfully logged out.");
	res.redirect("/campgrounds");
});

module.exports = router;