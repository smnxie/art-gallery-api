require("dotenv").config();


const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const artworkRoutes = require("./src/routes/artworkRoutes");
const unsplashRoutes = require("./src/routes/unsplashRoutes");
const metRoutes = require("./src/routes/metRoutes");



const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/api/unsplash", unsplashRoutes);
app.use("/api/met", metRoutes);



app.get("/api", (req, res) => {
  res.json({ message: "Art Gallery API is running" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT);
  })
  .catch(() => {
    process.exit(1);
  });
