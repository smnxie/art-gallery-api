const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
} = require("../controllers/artworkController");
const { validateArtwork } = require("../utils/validators");

router.post("/", authMiddleware, validateArtwork, createArtwork);
router.get("/", authMiddleware, getArtworks);
router.get("/:id", authMiddleware, getArtworkById);
router.put("/:id", authMiddleware, validateArtwork, updateArtwork);
router.delete("/:id", authMiddleware, deleteArtwork);

module.exports = router;

