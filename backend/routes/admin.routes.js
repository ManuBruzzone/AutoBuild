const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/admin.controllers");

router.post("/login", loginAdmin);

module.exports = router;

