// pages/index.js
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

        .actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 1.5rem; }

        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #2563EB; color: white; }
        .btn-secondary { background: white; border: 1px solid #D1D5DB; }
        .btn-success { background: #16A34A; color: white; }

        .hidden { display: none !important; }
      `}</style>

      <header>
        <div className="logo">Factur<span>X</span></div>
        <span className="badge-legale">Conforme EN 16931</span>
      </header>

      <div className="container">

        {/* ================= PAGE 3 ================= */}
        <div id="page3">

          <div className="card">

            <div className="actions">

              <button className="btn btn-success" id="btnTelecharger">
                Télécharger XML Factur-X
              </button>

              <button className="btn btn-secondary" id="btnNouveau">
                Nouvelle facture
              </button>

              {/* 💳 AJOUT STRIPE (SEUL AJOUT) */}
              <button
                className="btn btn-primary"
                id="btnPayer"
                onClick={() =>
                  window.location.href = "https://buy.stripe.com/test_xxxxxxxxxxx"
                }
              >
                💳 Payer
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ⚠️ IMPORTANT: fermeture correcte pour éviter page blanche */}
    </>
  );
}
