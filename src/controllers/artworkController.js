const Artwork = require("../models/Artwork");

const createArtwork = async (req, res, next) => {
  try {
    const { title, description, imageUrl, category } = req.body;

    const artwork = await Artwork.create({
      title,
      description,
      imageUrl,
      category,
      owner: req.user,
    });

    res.status(201).json(artwork);
  } catch (err) {
    next(err);
  }
};

const getArtworks = async (req, res, next) => {
  try {
    const artworks = await Artwork.find({ owner: req.user }).sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    next(err);
  }
};

const getArtworkById = async (req, res, next) => {
  try {
    const artwork = await Artwork.findOne({ _id: req.params.id, owner: req.user });
    if (!artwork) return res.status(404).json({ message: "Artwork not found" });
    res.json(artwork);
  } catch (err) {
    next(err);
  }
};

const updateArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findOneAndUpdate(
      { _id: req.params.id, owner: req.user },
      req.body,
      { new: true }
    );

    if (!artwork) return res.status(404).json({ message: "Artwork not found" });
    res.json(artwork);
  } catch (err) {
    next(err);
  }
};

const deleteArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findOneAndDelete({ _id: req.params.id, owner: req.user });
    if (!artwork) return res.status(404).json({ message: "Artwork not found" });
    res.json({ message: "Artwork deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
};
