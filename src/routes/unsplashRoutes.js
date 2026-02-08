const express = require("express");
const router = express.Router();
const { searchPhotos } = require("../controllers/unsplashController");

router.get("/search", searchPhotos);

module.exports = router;
