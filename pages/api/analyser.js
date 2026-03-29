// pages/api/analyser.js
const formidable = require('formidable');
const fs = require('fs').promises;
const { extractText } = require('../../src/utils/extractText');
const { extraireFacture } = require('../../src/lib/anthropicService');

// Désactiver le bodyParser de Next.js pour utiliser formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Données d'exemple si pas de fichier uploadé
const EXEMPLE_FACTURE = {
  numero: "FAC-2024-0042",
  date_emission: "2024-03-15",
  date_echeance: "2024-04-15",
  emetteur: {
    nom: "Tech Solutions SARL",
    siret: "85234567800012",
    tva: "FR12852345678",
    adresse: "15 rue de la Innovation, 67000 Strasbourg"
  },
  client: {
    nom: "Boulangerie Martin",
    siret: "79845612300045",
    adresse: "8 avenue du Pain, 51200 Épernay"
  },
  lignes: [
    {
      description: "Licence logiciel de gestion annuelle",
      quantite: 1,
      prix_unitaire: 890.00,
      taux_tva: 20,
      total_ht: 890.00
    },
    {
      description: "Formation équipe (2 jours)",
      quantite: 2,
      prix_unitaire: 450.00,
      taux_tva: 20,
      total_ht: 900.00
    },
    {
      description: "Support technique premium",
      quantite: 1,
      prix_unitaire: 150.00,
      taux_tva: 20,
      total_ht: 150.00
    }
  ],
  totaux: {
    ht: 1940.00,
    tva: 388.00,
    ttc: 2328.00
  },
  confiance: 93
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erreur: 'Méthode non autorisée' });
  }

  try {
    // Parser le formulaire multipart
    const form = new formidable.IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB max
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Si pas de fichier, retourner l'exemple
    if (!files.facture || !files.facture[0]) {
      return res.status(200).json({
        facture: EXEMPLE_FACTURE
      });
    }

    const file = files.facture[0];
    
    // Lire le fichier
    const fileBuffer = await fs.readFile(file.filepath);
    
    // Extraire le texte selon le type de fichier
    const texteFacture = await extractText(fileBuffer, file.mimetype);
    
    console.log('Texte extrait:', texteFacture.substring(0, 200) + '...');
    
    // Analyser avec Claude
    const factureData = await extraireFacture(texteFacture);
    
    // Nettoyer le fichier temporaire
    await fs.unlink(file.filepath).catch(err => console.error('Erreur nettoyage:', err));
    
    return res.status(200).json({
      facture: factureData
    });

  } catch (error) {
    console.error('Erreur API /analyser:', error);
    return res.status(500).json({
      erreur: error.message || 'Erreur lors de l\'analyse de la facture'
    });
  }
}