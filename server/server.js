require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const API_KEY = process.env.GNEWS_API_KEY; // Secure API key from .env

app.get("/api/news", async (req, res) => {
    const searchQuery = req.query.query;
    if (!searchQuery) {
        return res.status(400).json({ error: "Missing search query" });
    }

    const detectedLanguage = /[\u0370-\u03FF]/.test(searchQuery) ? 'el' : 'en';
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=${detectedLanguage}&max=10&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.articles);
    } catch (error) {
        console.error("GNews API Error:", error);
        res.status(500).json({ error: "Failed to fetch news articles" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
