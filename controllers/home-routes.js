const sequelize = require("../config/connection");
const router = require("express").Router();

router.get("/", (req, res) => {
    console.log(req.session);
    // To render HomePage template and send data to it to be displayed/used
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

module.exports = router;