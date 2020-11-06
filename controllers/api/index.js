const router = require('express').Router();
const userRoutes = require("./user-routes");
const lessonRoutes = require("./lesson-routes");

router.use("/users", userRoutes);
router.use("/lessons", lessonRoutes);

module.exports = router;