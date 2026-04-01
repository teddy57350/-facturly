import { IncomingForm } from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import Anthropic from "@anthropic-ai/sdk";
import Tesseract from "tesseract.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(500).json({ error: "Upload error" });
      }

      const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!uploadedFile) {
        return res.status(400).json({ error: "Aucun fichier reçu" });
      }

      const buffer = fs.readFileSync(uploadedFile.filepath);

      let text = "";

      try {
        const pdf = await pdfParse(buffer);
        text = (pdf.text || "").trim();
      } catch (parseError) {
        console.error("pdf-parse error:", parseError);
      }

      if (!text || text.length < 20) {
        try {
          const ocrResult = await Tesseract.recognize(uploadedFile.filepath, "eng");
          text = (ocrResult.data.text || "").trim();
        } catch (ocrError) {
          console.error("OCR error:", ocrError);
        }
      }

      if (!text || text.length < 20) {
        return res.status(400).json({
          error: "Le PDF ne contient pas assez de texte lisible, même après OCR.",
        });
      }

      if (!anthropic) {
        return res.status(500).json({
          error: "ANTHROPIC_API_KEY manquante sur le serveur",
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

Format attendu :
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

      const raw = response.content?.[0]?.text?.trim() || "";

      const cleaned = raw
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      let facture;
      try {
        facture = JSON.parse(cleaned);
      } catch (jsonError) {
        console.error("JSON parse IA error:", cleaned);
        return res.status(500).json({
          error: "Réponse IA invalide",
        });
      }

      return res.status(200).json({
        ai: JSON.stringify(facture),
      });
    } catch (error) {
      console.error("Erreur /api/invoice/convert:", error);
      return res.status(500).json({
        error: error.message || "Erreur conversion facture",
      });
    }
  });
}
