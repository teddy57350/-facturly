import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Upload error" });
      }

      const file = files.file;

      // MOCK IA (à remplacer par OpenAI plus tard)
      const aiResult = {
        invoiceNumber: "INV-001",
        total: 100,
        currency: "EUR",
        customer: "Client",
      };

      res.status(200).json({ ai: JSON.stringify(aiResult) });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Convert error" });
  }
}
