// pages/mentions-legales.js
export default function MentionsLegales() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1rem', fontFamily: 'sans-serif', color: '#1a1a2e', lineHeight: '1.7' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '2rem' }}>Mentions légales</h1>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Éditeur du site</h2>
      <p>FacturAI est un service édité par Teddy LALLEMAND, entrepreneur individuel.</p>
      <p>Contact : <a href="mailto:lallemandteddy@yahoo.fr" style={{ color: '#2563eb' }}>contact@facturai-x.fr</a></p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Hébergement</h2>
      <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 700, San Francisco, CA 94104, États-Unis.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Propriété intellectuelle</h2>
      <p>L'ensemble des contenus présents sur ce site (textes, images, logos) sont la propriété exclusive de FacturAI. Toute reproduction est interdite sans autorisation préalable.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Responsabilité</h2>
      <p>FacturAI s'efforce de fournir des fichiers Factur-X conformes à la norme EN 16931. Cependant, l'utilisateur reste responsable de vérifier la conformité des documents générés avec sa situation fiscale et légale spécifique.</p>

      <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '13px' }}>Dernière mise à jour : avril 2026</p>

      <p style={{ marginTop: '1rem' }}><a href="/" style={{ color: '#2563eb' }}>← Retour à l'accueil</a></p>
    </div>
  );
}
