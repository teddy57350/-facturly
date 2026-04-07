// pages/cgu.js
export default function CGU() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1rem', fontFamily: 'sans-serif', color: '#1a1a2e', lineHeight: '1.7' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '2rem' }}>Conditions Générales d'Utilisation</h1>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>1. Objet</h2>
      <p>FacturAI est un service en ligne permettant de convertir des factures au format PDF, Word ou image en fichiers Factur-X conformes à la norme EN 16931, obligatoire en France pour la facturation électronique.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>2. Accès au service</h2>
      <p>Le service est accessible gratuitement pour un maximum de 10 conversions par mois et par adresse email. Au-delà, un abonnement Pro à 9€/mois est requis.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>3. Abonnement Pro</h2>
      <p>L'abonnement Pro est facturé 9€ TTC par mois. Il peut être résilié à tout moment depuis le portail de gestion accessible sur le site. La résiliation prend effet à la fin de la période en cours.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>4. Responsabilité</h2>
      <p>FacturAI s'efforce de générer des fichiers conformes à la norme EN 16931. Cependant, l'utilisateur est seul responsable de vérifier la conformité des documents générés avec sa situation fiscale. FacturAI ne peut être tenu responsable des erreurs d'extraction dues à la qualité des documents fournis.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>5. Données personnelles</h2>
      <p>Le traitement des données personnelles est décrit dans notre <a href="/confidentialite" style={{ color: '#2563eb' }}>Politique de confidentialité</a>.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>6. Modification des CGU</h2>
      <p>FacturAI se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email en cas de modification substantielle.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>7. Contact</h2>
      <p>Pour toute question : <a href="mailto:lallemandteddy@yahoo.fr" style={{ color: '#2563eb' }}>lallemandteddy@yahoo.fr</a></p>

      <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '13px' }}>Dernière mise à jour : avril 2026</p>
      <p style={{ marginTop: '1rem' }}><a href="/" style={{ color: '#2563eb' }}>← Retour à l'accueil</a></p>
    </div>
  );
}
