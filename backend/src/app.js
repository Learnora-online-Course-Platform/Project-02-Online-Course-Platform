const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
dotenv.config();

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
