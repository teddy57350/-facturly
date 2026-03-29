// pages/api/generer.js
const { genererFacturX } = require('../../src/lib/facturxGenerator');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erreur: 'Méthode non autorisée' });
  }

  try {
    const { facture } = req.body;

    if (!facture) {
      return res.status(400).json({ erreur: 'Données de facture manquantes' });
    }

    // Générer le XML Factur-X
    const xml = genererFacturX(facture);

    return res.status(200).json({
      xml: xml,
      success: true
    });

  } catch (error) {
    console.error('Erreur API /generer:', error);
    return res.status(500).json({
      erreur: error.message || 'Erreur lors de la génération du XML'
    });
  }
}
