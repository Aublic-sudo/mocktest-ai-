import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_KEY = "gsk_xxx..."; // apna real Groq API key yaha rakho (server-side safe)

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
