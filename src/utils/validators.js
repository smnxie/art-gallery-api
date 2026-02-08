const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isNonEmptyString = (v, min = 1) => typeof v === "string" && v.trim().length >= min;

const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body || {};

  if (!isNonEmptyString(username, 3)) return res.status(400).json({ message: "Invalid username" });
  if (!isEmail(email)) return res.status(400).json({ message: "Invalid email" });
  if (!isNonEmptyString(password, 6)) return res.status(400).json({ message: "Invalid password" });

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!isEmail(email)) return res.status(400).json({ message: "Invalid email" });
  if (!isNonEmptyString(password, 6)) return res.status(400).json({ message: "Invalid password" });

  next();
};

const validateArtwork = (req, res, next) => {
  const { title, imageUrl, category, description } = req.body || {};

  if (!isNonEmptyString(title, 2)) return res.status(400).json({ message: "Invalid title" });
  if (!isNonEmptyString(imageUrl, 8)) return res.status(400).json({ message: "Invalid imageUrl" });

  const allowed = ["painting", "digital", "sculpture"];
  if (!allowed.includes(category)) return res.status(400).json({ message: "Invalid category" });

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ message: "Invalid description" });
  }

  next();
};

module.exports = { validateRegister, validateLogin, validateArtwork };
