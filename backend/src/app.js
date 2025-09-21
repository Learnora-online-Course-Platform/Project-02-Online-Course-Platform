const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => res.send("Backend is running 🚀"));

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
