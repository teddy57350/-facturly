import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import Anthropic from "@anthropic-ai/sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      const file = files.file;

      const dataBuffer = fs.readFileSync(file.filepath);
      const pdfData = await pdfParse(dataBuffer);

      const text = pdfData.text;

      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `
Tu es une IA spécialisée en facturation européenne (Factur-X / EN16931).

Analyse cette facture et retourne UNIQUEMENT un JSON valide :

FACTURE:
${text}

FORMAT:
{
  "supplier": "",
  "customer": "",
  "total": "",
  "vat": "",
  "date": "",
  "items": [
    { "name": "", "price": "" }
  ]
}
            `,
          },
        ],
      });

      const resultText = message.content[0].text;

      res.status(200).json({
        success: true,
        data: JSON.parse(resultText),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Claude IA error" });
    }
  });
}
