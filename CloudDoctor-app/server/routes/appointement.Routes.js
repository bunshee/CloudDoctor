const express = require("express");
const router = express.Router();
const {create, getAllMyAppointements,getAllMyPatientsAppointements, update} = require("../controllers/appointement.Controller");


router.route("/create").post(create);

router.route("/update").post(update);

router.route("/getAllMyAppointements").get( getAllMyAppointements);

router.route("/getAllMyPatientsAppointements").get(getAllMyPatientsAppointements);




module.exports = router;
