const express = require("express")
const router = express.Router();
const userRoute = require("./user")
const payments = require("./payments")
const adminRoute = require("./admin")
const courseRoute = require("./course")

router.use("/user", userRoute)
router.use("/payments", payments)
router.use("/admin", adminRoute)
router.use("/course", courseRoute)

module.exports = router