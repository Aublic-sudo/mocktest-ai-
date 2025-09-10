// api/proxy.js
export default async function handler(req, res) {
  const apiKey = process.env.GROQ_API_KEY; // Vercel env var
  const body = req.body;

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const data = await groqRes.text();
  res.status(groqRes.status).send(data);
}
