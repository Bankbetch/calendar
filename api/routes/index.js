const router = require("express").Router();
const config = require("../configs/index");
router.use(`/calendars`, require("./calendar.route"));

router.use(`*`, (req, res) => res.status(404).end());
module.exports = router;
