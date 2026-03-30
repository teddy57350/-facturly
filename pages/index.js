// pages/index.js
import { loadStripe } from "@stripe/stripe-js"; // ✅ AJOUT

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY); // ✅ AJOUT

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

        .upload-zone { border: 2px dashed #D1D5DB; border-radius: 10px; padding: 3rem 1rem; text-align: center; cursor: pointer; transition: all 0.2s; }
        .upload-zone:hover { border-color: #2563EB; background: #EFF6FF; }
        .upload-icon { width: 56px; height: 56px; background: #EFF6FF; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px; }
        .upload-zone h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
        .upload-zone p { font-size: 14px; color: #6B7280; margin-bottom: 16px; }
        .format-badges { display: flex; gap: 6px; justify-content: center; }
        .fbadge { background: #EFF6FF; color: #1D4ED8; font-size: 12px; padding: 3px 10px; border-radius: 6px; font-weight: 500; }

        .loading-bar { background: #E5E7EB; border-radius: 4px; height: 6px; margin: 12px 0; overflow: hidden; }
        .loading-bar-fill { background: #2563EB; height: 100%; border-radius: 4px; animation: loading 2s ease-in-out infinite; }
        @keyframes loading { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .fg { display: flex; flex-direction: column; gap: 5px; }
        .fg.full { grid-column: 1 / -1; }
        .fg label { font-size: 12px; color: #6B7280; font-weight: 500; }
        .fg input { padding: 9px 12px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 14px; color: #1A1A2E; transition: border-color 0.15s; }
        .fg input:focus { outline: none; border-color: #2563EB; }
        .section-sep { grid-column: 1 / -1; border-top: 1px solid #E5E7EB; padding-top: 14px; margin-top: 4px; }
        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }

        table.lignes { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
        table.lignes th { text-align: left; padding: 8px 10px; color: #6B7280; font-weight: 500; border-bottom: 1px solid #E5E7EB; background: #F9FAFB; }
        table.lignes td { padding: 8px 10px; border-bottom: 1px solid #F3F4F6; }
        table.lignes td input { border: none; background: transparent; font-size: 13px; width: 100%; color: #1A1A2E; }
        table.lignes td input:focus { outline: none; border-bottom: 1px solid #2563EB; }

        .totaux { display: flex; flex-direction: column; align-items: flex-end; margin-top: 16px; gap: 6px; }
        .total-row { display: flex; gap: 3rem; font-size: 14px; }
        .total-row .lbl { color: #6B7280; }
        .total-ttc { font-size: 18px; font-weight: 700; border-top: 2px solid #E5E7EB; padding-top: 10px; margin-top: 4px; }

        .actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 1.5rem; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; }
        .btn-primary { background: #2563EB; color: white; }
        .btn-primary:hover { background: #1D4ED8; }
        .btn-secondary { background: white; color: #374151; border: 1px solid #D1D5DB; }
        .btn-secondary:hover { background: #F9FAFB; }
        .btn-success { background: #16A34A; color: white; }
        .btn-success:hover { background: #15803D; }
        .btn-demo { background: #F3F4F6; color: #374151; border: 1px solid #E5E7EB; }
        .btn-demo:hover { background: #E5E7EB; }

        .success-circle { width: 64px; height: 64px; background: #DCFCE7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 28px; }
        .conformite-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; }
        .conf-item { display: flex; align-items: center; gap: 6px; }
        .conf-item .check { color: #16A34A; font-weight: 700; }

        .xml-preview { background: #1E1E2E; color: #A6E3A1; border-radius: 8px; padding: 1rem; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.6; max-height: 200px; overflow-y: auto; margin: 1rem 0; }

        .confidence { display: inline-flex; align-items: center; gap: 6px; background: #DCFCE7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; }

        .hidden { display: none !important; }

        .error-box { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 12px 16px; color: #DC2626; font-size: 14px; margin-top: 12px; }

        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
          .fg.full { grid-column: 1; }
          .hero h1 { font-size: 24px; }
        }
      `}</style>

      {/* ⚠️ TON CODE COMPLET ICI (INCHANGÉ) */}

      {/* 👉 SEULE AJOUT ICI (bouton paiement) */}
      <div style={{display:'flex', gap:'10px', justifyContent:'center', marginTop:'1.5rem', flexWrap:'wrap'}}>
        <button className="btn btn-success" id="btnTelecharger">Télécharger XML Factur-X</button>
        <button className="btn btn-primary" id="btnPayer">Payer 20€</button>
        <button className="btn btn-secondary" id="btnNouveau">Nouvelle facture</button>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let factureData = null;
        let xmlGenere = '';

        async function payer() {
          try {
            const stripe = await stripePromise;
            const res = await fetch('/api/create-checkout-session', { method: 'POST' });
            const data = await res.json();
            await stripe.redirectToCheckout({ sessionId: data.id });
          } catch (error) {
            alert('Erreur paiement : ' + error.message);
          }
        }

        // 👉 AJOUT EVENT
        setTimeout(() => {
          const btn = document.getElementById('btnPayer');
          if (btn) btn.addEventListener('click', payer);
        }, 500);

        /* ⚠️ TON SCRIPT ORIGINAL CONTINUE ICI SANS CHANGEMENT */
      `}} />
    </>
  );
