const express = require("express");

const auth = require("../controllers/auth/auth");

const { createFavorie, favories, getFavoritesByUserId, deleteFavorite } = require("../controllers/favorie.controller");
const router = express.Router();

router.post("/favories", auth, createFavorie);
router.get("/favories", auth, favories);
router.get("/favoriesUser", auth, getFavoritesByUserId);
router.delete("/favorites/:favoriteId", auth, deleteFavorite);
module.exports = router;