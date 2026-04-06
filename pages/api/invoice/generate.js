import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  try {
    const { facture } = req.body;
 
    // Extraction des données
    const invoiceNumber = facture?.invoiceNumber || facture?.numero || "N/A";
    const client = facture?.client || facture?.customer || "N/A";
    const emetteur = facture?.emetteur || facture?.seller || "FacturAI";
    const siretEmetteur = facture?.siret || facture?.siretEmetteur || "";
    const tvaEmetteur = facture?.tva || facture?.tvaEmetteur || "";
    const siretClient = facture?.siretClient || "";
    const date = facture?.date || facture?.invoiceDate || "N/A";
    const echeance = facture?.echeance || facture?.dueDate || "N/A";
    const total = facture?.total || facture?.grandTotal || facture?.totalTTC || "0";
    const totalHT = facture?.totalHT || "";
    const totalTVA = facture?.totalTVA || "";
    const currency = facture?.currency || "EUR";
    const lignes = facture?.lignes || facture?.lines || [];
 
    // Création PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
 
    const bleu = rgb(0.145, 0.388, 0.922);
    const noir = rgb(0, 0, 0);
    const gris = rgb(0.4, 0.4, 0.4);
    const grisClair = rgb(0.95, 0.95, 0.95);
    const blanc = rgb(1, 1, 1);
 
    // HEADER BLEU
    page.drawRectangle({ x: 0, y: 792, width: 595, height: 50, color: bleu });
    page.drawText("FacturAI", { x: 20, y: 808, size: 18, font: bold, color: blanc });
    page.drawText("EN 16931 — Factur-X", { x: 430, y: 808, size: 10, font, color: blanc });
 
    // TITRE FACTURE
    page.drawText("FACTURE", { x: 50, y: 750, size: 28, font: bold, color: bleu });
    page.drawText(`N° ${invoiceNumber}`, { x: 50, y: 720, size: 13, font, color: noir });
 
    // DATES
    page.drawText(`Date d'émission : ${date}`, { x: 350, y: 750, size: 11, font, color: noir });
    page.drawText(`Échéance : ${echeance}`, { x: 350, y: 733, size: 11, font, color: noir });
 
    // LIGNE SÉPARATRICE
    page.drawLine({ start: { x: 50, y: 708 }, end: { x: 545, y: 708 }, thickness: 1, color: bleu });
 
    // ÉMETTEUR
    page.drawText("ÉMETTEUR", { x: 50, y: 688, size: 9, font: bold, color: bleu });
    page.drawText(emetteur, { x: 50, y: 673, size: 11, font: bold, color: noir });
    if (siretEmetteur) page.drawText(`SIRET : ${siretEmetteur}`, { x: 50, y: 658, size: 10, font, color: gris });
    if (tvaEmetteur) page.drawText(`TVA : ${tvaEmetteur}`, { x: 50, y: 644, size: 10, font, color: gris });
 
    // CLIENT
    page.drawText("CLIENT", { x: 320, y: 688, size: 9, font: bold, color: bleu });
    page.drawText(client, { x: 320, y: 673, size: 11, font: bold, color: noir });
    if (siretClient) page.drawText(`SIRET : ${siretClient}`, { x: 320, y: 658, size: 10, font, color: gris });
 
    // LIGNE SÉPARATRICE
    page.drawLine({ start: { x: 50, y: 628 }, end: { x: 545, y: 628 }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
 
    // EN-TÊTE TABLEAU
    page.drawRectangle({ x: 50, y: 598, width: 495, height: 24, color: bleu });
    page.drawText("Description", { x: 58, y: 606, size: 10, font: bold, color: blanc });
    page.drawText("Qté", { x: 330, y: 606, size: 10, font: bold, color: blanc });
    page.drawText("P.U. HT", { x: 370, y: 606, size: 10, font: bold, color: blanc });
    page.drawText("TVA", { x: 430, y: 606, size: 10, font: bold, color: blanc });
    page.drawText("Total HT", { x: 475, y: 606, size: 10, font: bold, color: blanc });
 
    // LIGNES FACTURE
    let y = 580;
    if (lignes && lignes.length > 0) {
      lignes.forEach((ligne, i) => {
        if (i % 2 === 0) {
          page.drawRectangle({ x: 50, y: y - 6, width: 495, height: 20, color: grisClair });
        }
        const desc = String(ligne.description || ligne.desc || "").substring(0, 40);
        const qte = String(ligne.quantite || ligne.qty || 1);
        const pu = String(ligne.prix_unitaire || ligne.unitPrice || "");
        const tva = String(ligne.taux_tva || ligne.tva || "20") + "%";
        const totalLigne = String(ligne.total_ht || ligne.totalHT || "");
 
        page.drawText(desc, { x: 58, y, size: 9, font, color: noir });
        page.drawText(qte, { x: 335, y, size: 9, font, color: noir });
        page.drawText(pu, { x: 370, y, size: 9, font, color: noir });
        page.drawText(tva, { x: 435, y, size: 9, font, color: noir });
        page.drawText(totalLigne, { x: 478, y, size: 9, font, color: noir });
        y -= 22;
      });
    } else {
      page.drawText("Voir facture originale", { x: 58, y, size: 10, font, color: gris });
      y -= 22;
    }
 
    // TOTAUX
    const yTotaux = y - 20;
    page.drawLine({ start: { x: 350, y: yTotaux + 18 }, end: { x: 545, y: yTotaux + 18 }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
 
    if (totalHT) {
      page.drawText("Total HT :", { x: 370, y: yTotaux, size: 10, font, color: gris });
      page.drawText(`${totalHT} ${currency}`, { x: 470, y: yTotaux, size: 10, font, color: noir });
    }
    if (totalTVA) {
      page.drawText("TVA :", { x: 370, y: yTotaux - 18, size: 10, font, color: gris });
      page.drawText(`${totalTVA} ${currency}`, { x: 470, y: yTotaux - 18, size: 10, font, color: noir });
    }
 
    // TOTAL TTC — encadré
    const yTTC = totalHT ? yTotaux - 44 : yTotaux;
    page.drawRectangle({ x: 350, y: yTTC - 8, width: 195, height: 28, color: bleu });
    page.drawText("TOTAL TTC :", { x: 360, y: yTTC + 4, size: 11, font: bold, color: blanc });
    page.drawText(`${total} ${currency}`, { x: 460, y: yTTC + 4, size: 11, font: bold, color: blanc });
 
    // MENTIONS LÉGALES
    const yMentions = 120;
    page.drawLine({ start: { x: 50, y: yMentions + 20 }, end: { x: 545, y: yMentions + 20 }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
    page.drawText("Mentions légales", { x: 50, y: yMentions + 6, size: 8, font: bold, color: gris });
    page.drawText("Ce document est conforme à la norme EN 16931 (Factur-X). Généré automatiquement par FacturAI.", { x: 50, y: yMentions - 8, size: 8, font, color: gris });
    page.drawText("En cas de litige, la juridiction compétente est celle du siège social de l'émetteur.", { x: 50, y: yMentions - 20, size: 8, font, color: gris });
 
    // XML FACTUR-X EMBARQUÉ
    const dateFormatee = String(date).replace(/\//g, "").replace(/-/g, "").substring(0, 8) || "20260101";
    const xmlFacturX = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:factur-x.eu:1p0:minimum</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${invoiceNumber}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime><udt:DateTimeString format="102">${dateFormatee}</udt:DateTimeString></ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${emetteur}</ram:Name>
        <ram:SpecifiedLegalOrganization><ram:ID schemeID="0002">${siretEmetteur}</ram:ID></ram:SpecifiedLegalOrganization>
        <ram:SpecifiedTaxRegistration><ram:ID schemeID="VA">${tvaEmetteur}</ram:ID></ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${client}</ram:Name>
        <ram:SpecifiedLegalOrganization><ram:ID schemeID="0002">${siretClient}</ram:ID></ram:SpecifiedLegalOrganization>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>${currency}</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:GrandTotalAmount>${total}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${total}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;
 
    // Attacher XML au PDF
    const xmlBytes = new TextEncoder().encode(xmlFacturX);
    await pdfDoc.attach(xmlBytes, "factur-x.xml", {
      mimeType: "text/xml",
      description: "Factur-X XML",
      creationDate: new Date(),
      modificationDate: new Date(),
    });
 
    const pdfBytes = await pdfDoc.save();
 
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=facture_${invoiceNumber}_facturx.pdf`);
    return res.status(200).send(Buffer.from(pdfBytes));
 
  } catch (err) {
    console.error("Erreur /api/invoice/generate:", err);
    return res.status(500).json({ error: err.message || "Erreur génération PDF" });
  }
}
