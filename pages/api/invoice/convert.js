import { IncomingForm } from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm();

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

      if (!text || text.length < 20) {
        return res.status(400).json({
          error: "PDF non lisible (scan non géré)",
        });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
Analyse cette facture et retourne UNIQUEMENT un JSON valide.

Format :
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

      const raw = completion.choices[0].message.content.trim();

      let facture;
      try {
        facture = JSON.parse(raw);
      } catch {
        return res.status(500).json({
          error: "Réponse IA invalide",
        });
      }

      return res.status(200).json({
        ai: JSON.stringify(facture),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message || "Erreur conversion facture",
      });
    }
  });
}
