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
      if (err) {
        return res.status(500).json({ error: "Upload error" });
      }

      const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!uploadedFile) {
        return res.status(400).json({ error: "Aucun fichier reçu" });
      }

      const buffer = fs.readFileSync(uploadedFile.filepath);
      const pdf = await pdfParse(buffer);
      const text = (pdf.text || "").trim();

      if (!text) {
        return res.status(400).json({
          error: "Le PDF ne contient pas de texte lisible",
        });
      }

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-latest",
        max_tokens: 1200,
        messages: [
          {
            role: "user",
            content: `
Analyse cette facture et retourne UNIQUEMENT un JSON valide.

Champs attendus :
{
  "invoiceNumber": "",
  "client": "",
  "total": "",
  "date": "",
  "currency": "EUR"
}

Facture :
${text}
            `,
          },
        ],
      });

      const raw = response.content[0].text.trim();

      const cleaned = raw
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const facture = JSON.parse(cleaned);

      return res.status(200).json({ ai: JSON.stringify(facture) });
    } catch (error) {
      console.error("Erreur /api/invoice/convert:", error);
      return res.status(500).json({ error: "Erreur conversion facture" });
    }
  });
}
