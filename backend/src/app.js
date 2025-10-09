const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount your routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
