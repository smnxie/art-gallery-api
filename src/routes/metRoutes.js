const express = require("express");
const router = express.Router();
const { getArtworks } = require("../controllers/metController");

router.get("/artworks", getArtworks);

module.exports = router;
