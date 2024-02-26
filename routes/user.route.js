const express = require("express");
const { Create_user, code_verified, get_code_berified } = require("../controllers/user.controller");
const { login, logout } = require("../controllers/auth/login");
const auth = require("../controllers/auth/auth");
const { upload } = require("../controllers/storage");

const router = express.Router();

router.post("/create_user",upload.single('imageUrl'), Create_user);
router.post("/send-verification-code",auth, code_verified);
router.get("/send-verification-code",auth, get_code_berified);
router.post("/login", login);
router.post("/logout", logout);
logout

module.exports = router;