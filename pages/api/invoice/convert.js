import formidable from "formidable";
import fs from "fs";
import Anthropic from "@anthropic-ai/sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Upload error" });
      }

      const file = files.file;

      const fileData = fs.readFileSync(file.filepath, "utf8");

      // 🔥 IA analyse facture
      const response = await client.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: `
Analyse cette facture et retourne un JSON:
- client
- total
- date
- lignes

FACTURE:
${fileData}
            `,
          },
        ],
      });

      const aiText = response.content[0].text;

      // 👉 on renvoie direct pour test
      res.status(200).json({
        success: true,
        ai: aiText,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
}
