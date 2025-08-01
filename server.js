import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post('/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ error: 'Failed to generate content from Gemini API.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Gemini API server running at http://localhost:${PORT}`);
});
