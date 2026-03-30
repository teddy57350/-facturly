// pages/index.js
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);

  return (
    <>
      {/* GLOBAL STYLE */}
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f6f7fb;
          color: #111;
        }

        .container {
          max-width: 1000px;
          margin: auto;
          padding: 2rem;
        }

        header {
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: white;
          border-bottom: 1px solid #eee;
        }

        .logo {
          font-weight: 900;
          font-size: 18px;
        }

        .badge {
          background: #e8fff1;
          color: #166534;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
        }

        .hero {
          text-align: center;
          margin: 2rem 0;
        }

        .btn {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-secondary {
          background: #111;
          margin-left: 10px;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #eee;
          margin-top: 1rem;
        }

        .steps {
          display: flex;
          margin: 2rem 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #ddd;
        }

        .step {
          flex: 1;
          text-align: center;
          padding: 10px;
          font-size: 13px;
          background: #f1f1f1;
        }

        .step.active {
          background: #4f46e5;
          color: white;
        }

        .pricing {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 3rem;
          flex-wrap: wrap;
        }

        .plan {
          width: 300px;
          border-radius: 14px;
          padding: 2rem;
          text-align: center;
          border: 1px solid #e5e7eb;
          background: white;
        }

        .plan.pro {
          background: #111827;
          color: white;
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .price {
          font-size: 32px;
          font-weight: 800;
          margin: 10px 0;
        }

        .pop {
          background: #4f46e5;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          position: relative;
          top: -10px;
        }
      `}</style>

      {/* HEADER */}
      <header>
        <div className="logo">FacturX SaaS</div>
        <div className="badge">EN 16931</div>
      </header>

      <div className="container">

        {/* HERO */}
        <div className="hero">
          <h1>Générez vos factures Factur-X automatiquement</h1>
          <p>IA + conformité PDF/A-3 + XML embarqué</p>

          <button className="btn" onClick={() => setStep(1)}>
            🚀 Commencer
          </button>
        </div>

        {/* STEPS */}
        <div className="steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>Upload</div>
          <div className={`step ${step === 2 ? "active" : ""}`}>Vérification</div>
          <div className={`step ${step === 3 ? "active" : ""}`}>Export</div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="card">
            <h3>📄 Upload facture</h3>
            <input type="file" />
            <br /><br />
            <button className="btn" onClick={() => setStep(2)}>
              Continuer →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="card">
            <h3>🔍 Vérification IA</h3>

            <input placeholder="Numéro facture" />
            <br /><br />
            <input placeholder="Client" />

            <br /><br />

            <button onClick={() => setStep(1)}>Retour</button>{" "}
            <button className="btn" onClick={() => setStep(3)}>
              Générer →
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>
            <p>Factur-X (PDF/A-3 + XML embarqué)</p>

            <button className="btn" onClick={() => setStep(0)}>
              Nouvelle facture
            </button>
          </div>
        )}

        {/* PRICING */}
        <div className="pricing">

          {/* FREE */}
          <div className="plan">
            <h3>Gratuit</h3>

            <div className="price">0€</div>

            <p>
              ✔ 10 factures / mois<br />
              ✔ Export Factur-X<br />
              ✔ Standard support
            </p>

            <button
              className="btn"
              style={{ background: "#111", marginTop: "10px" }}
              onClick={() => alert("Plan Gratuit activé")}
            >
              Commencer
            </button>
          </div>

          {/* PRO */}
          <div className="plan pro">
            <div className="pop">Populaire</div>

            <h3>Pro</h3>

            <div className="price">19€</div>

            <p>
              ✔ Factures illimitées<br />
              ✔ IA extraction avancée<br />
              ✔ Export premium Factur-X<br />
              ✔ Support prioritaire
            </p>

            <button
              className="btn"
              onClick={() => alert("Stripe checkout 19€/mois")}
            >
              Passer Pro
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
