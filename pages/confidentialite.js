// pages/confidentialite.js
export default function Confidentialite() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1rem', fontFamily: 'sans-serif', color: '#1a1a2e', lineHeight: '1.7' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '2rem' }}>Politique de confidentialité</h1>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Données collectées</h2>
      <p>FacturAI collecte uniquement votre adresse email afin de gérer votre accès au service gratuit (limite de 10 conversions) et votre abonnement Pro.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Traitement des factures</h2>
      <p>Les fichiers que vous uploadez (PDF, Word, images) sont traités en temps réel par notre IA pour en extraire les données. Ces fichiers ne sont jamais stockés sur nos serveurs. Le traitement est effectué uniquement le temps nécessaire à la génération de votre fichier Factur-X.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Base légale</h2>
      <p>Le traitement de vos données est fondé sur l'exécution du contrat de service (article 6.1.b du RGPD) et votre consentement lors de l'inscription.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Conservation des données</h2>
      <p>Votre adresse email et votre compteur d'utilisation sont conservés tant que vous utilisez le service. Vous pouvez demander leur suppression à tout moment.</p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Prestataires tiers</h2>
      <p>FacturAI utilise les services suivants :</p>
      <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
        <li><strong>Anthropic</strong> — traitement IA des factures</li>
        <li><strong>Stripe</strong> — gestion des paiements</li>
        <li><strong>Supabase</strong> — base de données</li>
        <li><strong>Vercel</strong> — hébergement</li>
      </ul>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Vos droits</h2>
      <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : <a href="mailto:lallemandteddy@yahoo.fr" style={{ color: '#2563eb' }}>lallemandteddy@yahoo.fr</a></p>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginTop: '2rem', marginBottom: '0.5rem' }}>Cookies</h2>
      <p>FacturAI n'utilise pas de cookies publicitaires. Seul un stockage local (localStorage) est utilisé pour mémoriser votre email entre les sessions.</p>

      <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '13px' }}>Dernière mise à jour : avril 2026</p>
      <p style={{ marginTop: '1rem' }}><a href="/" style={{ color: '#2563eb' }}>← Retour à l'accueil</a></p>
    </div>
  );
}
