import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f6f7fb;
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
          margin: 5px;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-top: 1rem;
        }

        .pricing {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 3rem;
          flex-wrap: wrap;
        }

        .plan {
          width: 280px;
          padding: 2rem;
          border-radius: 14px;
          background: white;
          border: 1px solid #e5e7eb;
          text-align: center;
          position: relative;
        }

        .plan.pro {
          background: #111827;
          color: white;
          transform: scale(1.05);
        }

        .price {
          font-size: 32px;
          font-weight: 800;
          margin: 10px 0;
        }

        .populaire {
          position: absolute;
          top: -10px;
          right: 10px;
          background: #f59e0b;
          color: black;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>

      <div className="container">

        {/* HEADER */}
        <header>
          <div className="logo">FacturX SaaS</div>
          <div className="badge">EN 16931</div>
        </header>

        {/* HERO */}
        <div className="hero">
          <h1>Factur-X automatique</h1>
          <p>IA + génération PDF/A-3 + XML embarqué</p>

          <button className="btn" onClick={() => setStep(1)}>
            🚀 Commencer
          </button>
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
            <h3>🔍 Analyse IA</h3>
            <p>Extraction en cours...</p>
            <button className="btn" onClick={() => setStep(3)}>
              Générer Factur-X →
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>
            <p>Total : 19€</p>

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
              ✔ Support standard
            </p>

            <button className="btn" onClick={() => alert("Plan Gratuit")}>
              Commencer
            </button>
          </div>

          {/* PRO */}
          <div className="plan pro">
            <div className="populaire">Populaire</div>

            <h3>Pro</h3>
            <div className="price">19€</div>

            <p>
              ✔ Factures illimitées<br />
              ✔ IA avancée<br />
              ✔ Export premium Factur-X<br />
              ✔ Support prioritaire
            </p>

            <button className="btn" onClick={() => alert("Stripe checkout")}>
              Passer Pro
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
🧠 CE QUI EST MAINTENANT CORRIGÉ

✔ plus de JSX cassé
