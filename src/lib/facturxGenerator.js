// src/lib/facturxGenerator.js

/**
 * Génère un XML Factur-X conforme à la norme EN 16931
 * @param {Object} facture - Les données de la facture
 * @returns {string} Le XML Factur-X
 */
function genererFacturX(facture) {
  const dateEmission = facture.date_emission.replace(/-/g, '');
  const dateEcheance = facture.date_echeance ? facture.date_echeance.replace(/-/g, '') : dateEmission;
  
  // Calcul de la TVA par taux
  const tvaParTaux = {};
  (facture.lignes || []).forEach(ligne => {
    const taux = ligne.taux_tva || 20;
    if (!tvaParTaux[taux]) {
      tvaParTaux[taux] = {
        baseHT: 0,
        montantTVA: 0
      };
    }
    tvaParTaux[taux].baseHT += ligne.total_ht || 0;
    tvaParTaux[taux].montantTVA += (ligne.total_ht || 0) * (taux / 100);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice 
  xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" 
  xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100" 
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" 
  xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:minimum</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  
  <rsm:ExchangedDocument>
    <ram:ID>${escapeXml(facture.numero)}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">${dateEmission}</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  
  <rsm:SupplyChainTradeTransaction>
    <ram:IncludedSupplyChainTradeLineItem>
      ${(facture.lignes || []).map((ligne, index) => `
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>${index + 1}</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:Name>${escapeXml(ligne.description)}</ram:Name>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>${(ligne.prix_unitaire || 0).toFixed(2)}</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">${ligne.quantite || 1}</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>${ligne.taux_tva || 20}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>${(ligne.total_ht || 0).toFixed(2)}</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>`).join('')}
    </ram:IncludedSupplyChainTradeLineItem>
    
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${escapeXml(facture.emetteur.nom)}</ram:Name>
        <ram:PostalTradeAddress>
          <ram:LineOne>${escapeXml(facture.emetteur.adresse)}</ram:LineOne>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${facture.emetteur.siret || ''}</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${facture.emetteur.tva || ''}</ram:ID>
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      
      <ram:BuyerTradeParty>
        <ram:Name>${escapeXml(facture.client.nom)}</ram:Name>
        <ram:PostalTradeAddress>
          <ram:LineOne>${escapeXml(facture.client.adresse)}</ram:LineOne>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
        ${facture.client.siret ? `<ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${facture.client.siret}</ram:ID>
        </ram:SpecifiedLegalOrganization>` : ''}
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    
    <ram:ApplicableHeaderTradeDelivery>
      <ram:ActualDeliverySupplyChainEvent>
        <ram:OccurrenceDateTime>
          <udt:DateTimeString format="102">${dateEmission}</udt:DateTimeString>
        </ram:OccurrenceDateTime>
      </ram:ActualDeliverySupplyChainEvent>
    </ram:ApplicableHeaderTradeDelivery>
    
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      ${Object.entries(tvaParTaux).map(([taux, data]) => `
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>${data.montantTVA.toFixed(2)}</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>${data.baseHT.toFixed(2)}</ram:BasisAmount>
        <ram:CategoryCode>S</ram:CategoryCode>
        <ram:RateApplicablePercent>${taux}</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>`).join('')}
      
      <ram:SpecifiedTradePaymentTerms>
        <ram:DueDateDateTime>
          <udt:DateTimeString format="102">${dateEcheance}</udt:DateTimeString>
        </ram:DueDateDateTime>
      </ram:SpecifiedTradePaymentTerms>
      
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${(facture.totaux.ht || 0).toFixed(2)}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${(facture.totaux.ht || 0).toFixed(2)}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">${(facture.totaux.tva || 0).toFixed(2)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${(facture.totaux.ttc || 0).toFixed(2)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${(facture.totaux.ttc || 0).toFixed(2)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

  return xml;
}

/**
 * Échappe les caractères spéciaux XML
 */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = { genererFacturX };
