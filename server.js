import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Best practice: API key environment variable me rakho
const GROQ_KEY = process.env.GROQ_API_KEY || "gsk_xxx..."; // fallback optional

app.post("/api/groq", async (req, res) => {
  try {
    const { model, messages, max_tokens, temperature } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_KEY,
      },
      body: JSON.stringify({ model, messages, max_tokens, temperature }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
