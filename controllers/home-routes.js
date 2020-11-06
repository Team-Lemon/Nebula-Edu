const sequelize = require("../config/connection");
const router = require("express").Router();
const { Lesson, User, Comment } = require("../models");

router.get("/", (req, res) => {
    console.log(req.session);
    // To render HomePage template and send data to it to be displayed/used

    //  Awaiting db PostID for multiple pages (HTML, CSS, and JS)
    res.render('homepage', {loggedIn: req.session.loggedIn});
});

router.get("/login", (req, res) => {
    // To redirect users to the Homepage
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/new-lesson", (req, res) => {
    res.render("add-lesson" , {loggedIn: req.session.loggedIn});
});

module.exports = router;