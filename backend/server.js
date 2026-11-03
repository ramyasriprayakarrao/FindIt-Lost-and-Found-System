require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        message: "FindIt server is running"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`FindIt API running on port ${PORT}`);
});