import { PDFDocument, StandardFonts } from "pdf-lib";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erreur: 'Méthode non autorisée' });
  }

  try {
    const { facture } = req.body;

    if (!facture) {
      return res.status(400).json({ erreur: 'Données manquantes' });
    }

    // 🔥 PDF simple mais fonctionnel
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("FACTURE FACTUR-X", { x: 50, y: 750, size: 20, font });

    page.drawText(`Client: ${facture.client || "N/A"}`, {
      x: 50,
      y: 700,
      size: 12,
      font,
    });

    page.drawText(`Total: ${facture.total || "N/A"} €`, {
      x: 50,
      y: 680,
      size: 12,
      font,
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=facture.pdf"
    );

    return res.status(200).send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erreur: "Erreur génération PDF" });
  }
}
