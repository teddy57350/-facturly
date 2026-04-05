import { IncomingForm } from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(500).json({ error: `Upload error: ${err.message}` });
      }

      const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!uploadedFile) {
        return res.status(400).json({ error: "Aucun fichier reçu" });
      }

      const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
      if (!ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: "ANTHROPIC_API_KEY manquante sur le serveur" });
      }

      const buffer = fs.readFileSync(uploadedFile.filepath);
      let text = "";

      try {
        const pdf = await pdfParse(buffer);
        text = (pdf.text || "").trim();
      } catch (e) {
        return res.status(500).json({ error: `Erreur lecture PDF: ${e.message}` });
      }

      if (!text || text.length < 20) {
        return res.status(400).json({
          error: "Le PDF ne contient pas assez de texte lisible.",
        });
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Analyse cette facture et retourne UNIQUEMENT un JSON valide, sans texte avant ou après.
Format :
{
  "invoiceNumber": "",
  "client": "",
  "total": "",
  "date": "",
  "currency": "EUR",
  "emetteur": "",
  "siret": "",
  "tva": "",
  "totalHT": "",
  "totalTVA": ""
}

Facture :
${text}`,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        return res.status(500).json({ error: data.error.message });
      }

      const raw = data.content?.[0]?.text?.trim() || "";

      // Nettoyer et extraire le JSON
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ error: `Réponse IA invalide: ${raw}` });
      }

      let facture;
      try {
        facture = JSON.parse(jsonMatch[0]);
      } catch {
        return res.status(500).json({ error: `JSON invalide: ${raw}` });
      }

      return res.status(200).json({
        ai: JSON.stringify(facture),
      });

    } catch (error) {
      return res.status(500).json({
        error: error.message || "Erreur conversion facture",
      });
    }
  });
}
