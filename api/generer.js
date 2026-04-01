import { PDFDocument, StandardFonts } from "pdf-lib";

export default async function handler(req, res) {
  try {
    const { facture } = req.body;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("FACTURE FACTUR-X", {
      x: 50,
      y: 350,
      size: 20,
      font,
    });

    page.drawText(`Client: ${facture?.client || "N/A"}`, {
      x: 50,
      y: 300,
      size: 12,
      font,
    });

    page.drawText(`Total: ${facture?.total || "0"} €`, {
      x: 50,
      y: 270,
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur génération PDF" });
  }
}
