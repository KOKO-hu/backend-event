const express = require("express");

const auth = require("../controllers/auth/auth");

const { createFavorie, favories } = require("../controllers/favorie.controller");
const router = express.Router();

router.post("/favories", auth, createFavorie);
router.get("/favories", auth, favories);
module.exports = router;