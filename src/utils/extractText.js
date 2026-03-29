// src/utils/extractText.js
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');

/**
 * Extrait le texte d'un fichier uploadé
 * @param {Buffer} buffer - Le buffer du fichier
 * @param {string} mimetype - Le type MIME du fichier
 * @returns {Promise<string>} Le texte extrait
 */
async function extractText(buffer, mimetype) {
  try {
    // PDF
    if (mimetype === 'application/pdf') {
      const data = await pdfParse(buffer);
      return data.text;
    }
    
    // Word (.docx)
    if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }
    
    // Images (OCR avec Tesseract)
    if (mimetype.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(buffer, 'fra', {
        logger: m => console.log(m)
      });
      return text;
    }
    
    throw new Error('Format de fichier non supporté');
  } catch (error) {
    console.error('Erreur extraction texte:', error);
    throw error;
  }
}

module.exports = { extractText };
