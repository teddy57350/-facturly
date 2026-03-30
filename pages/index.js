// pages/index.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('price_1TGRS8567jEq7M8FdoYkX2CT');

function SubscribeButton() {
  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', { method: 'POST' });
    const data = await response.json();
    if (data.sessionId) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert('Erreur lors de la création de la session.');
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      style={{
        margin: '20px auto',
        display: 'block',
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#2563EB',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      S’abonner à 19€
    </button>
  );
}

export default function Home() {
  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8F9FA; color: #1A1A2E; min-height: 100vh; }

        header { background: white; border-bottom: 1px solid #E5E7EB; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 20px; font-weight: 700; color: #1A1A2E; }
        .logo span { color: #2563EB; }
        .badge-legale { background: #DCFCE7; color: #166534; font-size: 12px; padding: 4px 10px; border-radius: 20px; font-weight: 500; }

        .container { max-width: 860px; margin: 0 auto; padding: 2rem 1rem; }

        .hero { text-align: center; margin-bottom: 2.5rem; }
        .hero h1 { font-size: 32px; font-weight: 700; color: #1A1A2E; margin-bottom: 8px; }
        .hero p { font-size: 16px; color: #6B7280; max-width: 500px; margin: 0 auto 1.5rem; }
        .hero-badges { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .hbadge { background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 6px 14px; font-size: 13px; color: #374151; }

        .steps { display: flex; gap: 0; margin-bottom: 2rem; background: white; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; }
        .step { flex: 1; padding: 16px 12px; text-align: center; font-size: 13px; color: #9CA3AF; border-right: 1px solid #E5E7EB; position: relative; }
        .step:last-child { border-right: none; }
        .step.active { color: #2563EB; background: #EFF6FF; font-weight: 600; }
        .step.done { color: #16A34A; background: #F0FDF4; }
        .step-n { display: block; font-size: 11px; margin-bottom: 2px; opacity: 0.7; }

        .card { background: white; border-radius: 12px; border: 1px solid #E5E7EB; padding: 1.5rem; margin-bottom: 1rem; }

        /* Ajoutez votre CSS ici, inchangé */
      `}</style>

      <header>
        <div className="logo">Factur<span>X</span></div>
        <span className="badge-legale">Conforme EN 16931</span>
      </header>

      <div className="container">
        {/* contenu existant */}
        <div className="hero">
          <h1>Convertissez vos factures en Factur-X</h1>
          <p>Uploadez votre facture — l'IA extrait les données automatiquement et génère le format légal.</p>
          <div className="hero-badges">
            <span className="hbadge">Obligation légale 2026-2027</span>
            <span className="hbadge">100% automatique</span>
            <span className="hbadge">Gratuit pour démarrer</span>
          </div>
        </div>

        <div className="steps">
          <div className="step active" id="step1"><span className="step-n">ÉTAPE 1</span>Import</div>
          <div className="step" id="step2"><span className="step-n">ÉTAPE 2</span>Vérification</div>
          <div className="step" id="step3"><span className="step-n">ÉTAPE 3</span>Export</div>
        </div>

        {/* ... autres contenus ... */}

        {/* Placez le bouton ici, en fin de la div container */}
        <SubscribeButton />
      </div>
    </>
  );
}
Note importante :
