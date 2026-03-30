export default function Home() {
  return (
    <>
      {/* ✅ AJOUT STRIPE SAFE */}
      <script src="https://js.stripe.com/v3/"></script>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8F9FA; color: #1A1A2E; min-height: 100vh; }
      `}</style>

      {/* ⚠️ TOUT TON CODE ORIGINAL RESTE IDENTIQUE */}

      <div id="page3">
        <button id="btnTelecharger">Télécharger</button>

        {/* ✅ AJOUT BOUTON */}
        <button id="btnPayer">💳 Payer</button>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let factureData = null;
        let xmlGenere = '';

        // ✅ FIX ICI (aucune autre modif)
        window.onload = function() {
          const stripe = Stripe("TA_CLE_PUBLIQUE_STRIPE");

          const btn = document.getElementById('btnPayer');
          if (!btn) return;

          btn.addEventListener('click', async () => {
            try {
              const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
              });

              const session = await response.json();

              await stripe.redirectToCheckout({
                sessionId: session.id,
              });
            } catch (err) {
              alert("Erreur paiement : " + err.message);
            }
          });
        };
      `}} />
    </>
  );
}
