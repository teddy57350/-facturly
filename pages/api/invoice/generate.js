import { PDFDocument, StandardFonts } from "pdf-lib";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { facture } = req.body;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("FACTURE FACTUR-X", { x: 50, y: 350, font });
    page.drawText(`Invoice: ${facture?.invoiceNumber || "-"}`, { x: 50, y: 300, font });
    page.drawText(`Total: ${facture?.total || 0} €`, { x: 50, y: 270, font });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=facture.pdf");

    res.status(200).send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF error" });
  }
}
      "Content-Disposition",
      "attachment; filename=facture.pdf"
    );

    return res.status(200).send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erreur: "Erreur génération PDF" });
  }
}
