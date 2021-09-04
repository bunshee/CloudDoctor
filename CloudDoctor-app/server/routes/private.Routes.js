const express = require ("express");
const router = express.Router();
const { getPrivateDataMe, getPrivateDataAllDoctors  } = require("../controllers/private.Controller");
const { protect } = require('../middleware/auth');

router.route("/me").get(protect, getPrivateDataMe);
router.route("/allDoctors").get(getPrivateDataAllDoctors);

module.exports = router;