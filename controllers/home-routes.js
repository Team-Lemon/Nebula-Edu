const sequelize = require("../config/connection");
const router = require("express").Router();

router.get("/", (req, res) => {
    console.log(req.session);
    res.render('homepage');
});

module.exports = router;