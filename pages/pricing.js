// pages/pricing.js
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || 'price_1TGRS8567jEq7M8FdoYkX2CT',
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la redirection vers le paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8F9FA; }
        
        .pricing-container { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; }
        .pricing-header { text-align: center; margin-bottom: 4rem; }
        .pricing-header h1 { font-size: 42px; font-weight: 700; color: #1A1A2E; margin-bottom: 1rem; }
        .pricing-header p { font-size: 18px; color: #6B7280; }
        
        .plans { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 900px; margin: 0 auto; }
        .plan { background: white; border: 2px solid #E5E7EB; border-radius: 16px; padding: 2.5rem; position: relative; }
        .plan.featured { border-color: #2563EB; box-shadow: 0 10px 40px rgba(37, 99, 235, 0.1); }
        .plan.featured::before { content: 'POPULAIRE'; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #2563EB; color: white; padding: 4px 16px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        
        .plan-name { font-size: 24px; font-weight: 700; color: #1A1A2E; margin-bottom: 0.5rem; }
        .plan-price { font-size: 48px; font-weight: 700; color: #1A1A2E; margin-bottom: 0.5rem; }
        .plan-price span { font-size: 18px; color: #6B7280; font-weight: 400; }
        .plan-desc { color: #6B7280; margin-bottom: 2rem; font-size: 14px; }
        
        .plan-features { list-style: none; margin-bottom: 2rem; }
        .plan-features li { padding: 0.75rem 0; display: flex; align-items: start; gap: 0.75rem; font-size: 15px; color: #374151; }
        .plan-features li::before { content: '✓'; color: #16A34A; font-weight: 700; font-size: 18px; }
        
        .btn-plan { width: 100%; padding: 14px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
        .btn-plan.primary { background: #2563EB; color: white; }
        .btn-plan.primary:hover { background: #1D4ED8; transform: translateY(-1px); }
        .btn-plan.secondary { background: white; color: #374151; border: 2px solid #D1D5DB; }
        .btn-plan.secondary:hover { background: #F9FAFB; }
        .btn-plan:disabled { opacity: 0.6; cursor: not-allowed; }
        
        @media (max-width: 768px) {
          .plans { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Choisissez votre plan</h1>
          <p>Factures illimitées ou essayez gratuitement</p>
        </div>

        <div className="plans">
          {/* Plan Gratuit */}
          <div className="plan">
            <h2 className="plan-name">Gratuit</h2>
            <div className="plan-price">
              0€<span> / mois</span>
            </div>
            <p className="plan-desc">Pour tester Facturly</p>
            
            <ul className="plan-features">
              <li>10 factures par mois</li>
              <li>Extraction automatique par IA</li>
              <li>Génération XML Factur-X</li>
              <li>Conforme EN 16931</li>
              <li>Support par email</li>
            </ul>
            
            <button className="btn-plan secondary" onClick={() => window.location.href = '/'}>
              Commencer gratuitement
            </button>
          </div>

          {/* Plan Pro */}
          <div className="plan featured">
            <h2 className="plan-name">Plan Pro</h2>
            <div className="plan-price">
              19€<span> / mois</span>
            </div>
            <p className="plan-desc">Pour les professionnels</p>
            
            <ul className="plan-features">
              <li>Factures illimitées</li>
              <li>Extraction automatique par IA</li>
              <li>Génération XML Factur-X</li>
              <li>Conforme EN 16931</li>
              <li>Support prioritaire</li>
              <li>Historique complet</li>
              <li>Accès API</li>
            </ul>
            
            <button 
              className="btn-plan primary" 
              onClick={handleUpgrade}
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Passer au Pro'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
