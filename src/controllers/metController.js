const axios = require("axios");

const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

const getArtworks = async (req, res, next) => {
  try {
    const q = String(req.query.q || "art").trim();
    const limit = Math.min(parseInt(req.query.limit || "12", 10), 24);

    const searchResp = await axios.get(`${MET_BASE}/search`, {
      params: { q, hasImages: true },
      timeout: 10000,
    });

    const ids = (searchResp.data.objectIDs || []).slice(0, limit);

    const artworks = await Promise.all(
      ids.map(async (id) => {
        const objResp = await axios.get(`${MET_BASE}/objects/${id}`, { timeout: 10000 });
        const o = objResp.data;

        return {
          id: o.objectID,
          title: o.title || "",
          artist: o.artistDisplayName || "",
          imageUrl: o.primaryImageSmall || o.primaryImage || "",
          objectURL: o.objectURL || "",
        };
      })
    );

   
    const filtered = artworks.filter((a) => a.imageUrl);

    res.json({ query: q, count: filtered.length, artworks: filtered });
  } catch (err) {
    next(err);
  }
};

module.exports = { getArtworks };
