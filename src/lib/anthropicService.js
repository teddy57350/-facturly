// src/lib/anthropicService.js
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Extrait les données structurées d'une facture via Claude
 * @param {string} texteFacture - Le texte extrait de la facture
 * @returns {Promise<Object>} Les données structurées de la facture
 */
async function extraireFacture(texteFacture) {
  const prompt = `Tu es un expert en extraction de données de factures françaises. 
Analyse le texte suivant et extrait TOUTES les informations pertinentes.

IMPORTANT: Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte avant ou après.

Structure attendue:
{
  "numero": "numéro de facture",
  "date_emission": "YYYY-MM-DD",
  "date_echeance": "YYYY-MM-DD",
  "emetteur": {
    "nom": "raison sociale",
    "siret": "14 chiffres",
    "tva": "numéro TVA intracommunautaire",
    "adresse": "adresse complète"
  },
  "client": {
    "nom": "raison sociale",
    "siret": "14 chiffres si disponible",
    "adresse": "adresse complète"
  },
  "lignes": [
    {
      "description": "description du produit/service",
      "quantite": nombre,
      "prix_unitaire": nombre,
      "taux_tva": nombre (en %),
      "total_ht": nombre
    }
  ],
  "totaux": {
    "ht": nombre,
    "tva": nombre,
    "ttc": nombre
  },
  "confiance": nombre entre 0 et 100
}

Texte de la facture:
${texteFacture}`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].text;
    
    // Nettoyer la réponse (enlever les backticks markdown si présents)
    let cleanJson = responseText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/```\s*/g, '').replace(/```\s*$/g, '');
    }
    
    const factureData = JSON.parse(cleanJson);
    
    return factureData;
  } catch (error) {
    console.error('Erreur Anthropic API:', error);
    throw new Error('Impossible d\'extraire les données de la facture: ' + error.message);
  }
}

module.exports = { extraireFacture };
