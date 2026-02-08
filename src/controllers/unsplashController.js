const axios = require("axios");

const UNSPLASH_BASE = "https://api.unsplash.com";

const searchPhotos = async (req, res, next) => {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      return res.status(500).json({ message: "UNSPLASH_ACCESS_KEY is missing" });
    }

    const q = (req.query.q || "art").toString().trim();
    const perPage = Math.min(parseInt(req.query.perPage || "12", 10), 30);

    const resp = await axios.get(`${UNSPLASH_BASE}/search/photos`, {
      params: { query: q, per_page: perPage },
      headers: { Authorization: `Client-ID ${accessKey}` },
      timeout: 8000,
    });

    const items = (resp.data?.results || []).map((p) => ({
      id: p.id,
      imageUrl: p.urls?.regular || p.urls?.small,
      thumbUrl: p.urls?.small,
      description: p.alt_description || p.description || "",
      authorName: p.user?.name || "",
      authorUrl: p.user?.links?.html || "",
      photoUrl: p.links?.html || "",
    }));

    res.json({ query: q, count: items.length, items });
  } catch (err) {
    next(err);
  }
};

module.exports = { searchPhotos };
