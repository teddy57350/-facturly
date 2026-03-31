import { PDFDocument, StandardFonts } from "pdf-lib";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    // créer PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("FACTURE FACTUR-X", {
      x: 50,
      y: 750,
      size: 20,
      font,
    });

    page.drawText("Client: ACME Corp", {
      x: 50,
      y: 700,
      size: 12,
      font,
    });

    page.drawText("Total: 19€", {
      x: 50,
      y: 680,
      size: 12,
      font,
    });

    const pdfBytes = await pdfDoc.save();

    // réponse
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=facture.pdf");

    res.status(200).send(Buffer.from(pdfBytes));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur PDF" });
  }
}
