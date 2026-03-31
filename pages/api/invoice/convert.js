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
    // ⚠️ ici tu simules un PDF (test)
    const pdfContent = `
      FACTURE FACTUR-X

      Client: ACME Corp
      Total: 19€
    `;

    const buffer = Buffer.from(pdfContent);

    // ✅ IMPORTANT
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=facture.pdf");

    res.status(200).send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur génération PDF" });
  }
}
