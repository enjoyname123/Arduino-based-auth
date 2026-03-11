const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// --- SECURE CONNECTION LOGIC ---
// This looks for a hidden variable on Render called MONGO_URI.
// If it doesn't find it, it defaults to a local test database.
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/secureTerminal";

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas via Environment Variable"))
    .catch(err => console.error("Database connection error:", err));
// -------------------------------

// Server "Health Check" - This makes your green/yellow status light work
app.get('/', (req, res) => res.send("Server Awake"));

// Database Schema
const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    payload: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Handle Registration & Profile Updates
app.post('/register', async (req, res) => {
    const { userId, payload } = req.body;
    try {
        await User.findOneAndUpdate({ userId }, { payload }, { upsert: true });
        res.json({ message: "Success" });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// Handle Login & Data Retrieval
app.post('/login', async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findOne({ userId });
        if (!user) return res.status(404).json({ error: "User ID not found." });
        res.json({ payload: user.payload });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Secure server live on port ${port}`));
