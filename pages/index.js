import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(0);
  const [freeCount, setFreeCount] = useState(0);

  const FREE_LIMIT = 10;

  const handleFreeStart = () => {
    if (freeCount >= FREE_LIMIT) {
      alert("Limite gratuite atteinte (10 factures). Passe en Pro 🚀");
      return;
    }
    setStep(1);
  };

const handleGenerate = async () => {
  if (!file) {
    alert("Ajoute une facture");
    return;
  }

  setStep(2);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/invoice/convert", {
      method: "POST",
      body: formData,
    });

    const raw = await res.text();

    if (!res.ok) {
      throw new Error(raw);
    }

    const data = JSON.parse(raw);

    let facture;
    try {
      facture = JSON.parse(data.ai);
    } catch {
      facture = data.ai;
    }

    const res2 = await fetch("/api/invoice/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facture }),
    });

    if (!res2.ok) {
      const raw2 = await res2.text();
      throw new Error(raw2);
    }

    const blob = await res2.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "facture_facturx.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setFreeCount((prev) => prev + 1);
    setStep(3);
  } catch (err) {
    console.error(err);
    alert(err.message || "Erreur génération facture");
    setStep(0);
  }
};

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur Stripe");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur paiement");
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background: radial-gradient(circle at top, #a5f3fc, #f0fdf4, #eef2ff);
          min-height: 100vh;
        }

        body::before {
          content: "";
          position: fixed;
          top: 50%;
          left: 50%;
          width: 500px;
          height: 500px;
          transform: translate(-50%, -50%);
          background: url("/watermark.png") no-repeat center;
          background-size: contain;
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        header {
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          border: 1px solid #e5e7eb;
        }

        .logo {
          font-weight: 900;
          font-size: 16px;
        }

        .badge {
          background: #dcfce7;
          color: #166534;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
        }

        .hero {
          text-align: center;
          margin: 2.5rem 0 1.5rem;
        }

        .hero h1 {
          font-size: 56px;
          margin: 0 0 10px;
          color: #0f172a;
        }

        .hero p {
          font-size: 17px;
          color: #334155;
          margin: 0 0 20px;
        }

        .counter {
          margin-top: 10px;
          font-size: 14px;
          color: #111827;
        }

        .btn {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          margin-top: 10px;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 14px;
          margin-top: 20px;
          border: 1px solid #eee;
        }

        .card h3 {
          margin-top: 0;
          color: #111827;
        }

        .uploadBox {
          margin-top: 10px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .pricingSection {
          padding: 40px 0 20px;
        }

        .pricingTitle {
          text-align: center;
          font-size: 52px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .pricingSubtitle {
          text-align: center;
          color: #64748b;
          margin-top: 12px;
          margin-bottom: 30px;
          font-size: 16px;
        }

        .pricing {
          display: flex;
          gap: 28px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .plan {
          width: 360px;
          padding: 2.2rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid #d1d5db;
          text-align: left;
          position: relative;
          box-sizing: border-box;
        }

        .plan.pro {
          border: 2px solid #2563eb;
          background: rgba(255, 255, 255, 0.82);
        }

        .popular {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #2563eb;
          color: white;
          border-radius: 999px;
          padding: 4px 14px;
          font-size: 12px;
          font-weight: 700;
        }

        .plan h3 {
          margin: 20px 0 18px;
          font-size: 22px;
          color: #0f172a;
        }

        .priceRow {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }

        .price {
          font-size: 50px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
        }

        .per {
          color: #64748b;
          font-size: 18px;
        }

        .underPrice {
          color: #64748b;
          font-size: 16px;
          margin-bottom: 28px;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 14px;
          color: #334155;
          font-size: 15px;
          margin-bottom: 26px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .check {
          color: #16a34a;
          font-weight: 700;
          font-size: 18px;
        }

        .planButton {
          width: 100%;
          border-radius: 12px;
          padding: 14px 18px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
        }

        .planButton.free {
          background: white;
          border: 2px solid #d1d5db;
          color: #0f172a;
        }

        .planButton.pro {
          background: #2563eb;
          border: none;
          color: white;
        }
      `}</style>

      <div className="container">
        <header>
          <div className="logo">FacturX SaaS 🚀</div>
          <div className="badge">EN 16931</div>
        </header>

        <div className="hero">
          <h1>Factur-X automatique ✨</h1>
          <p>IA + PDF/A-3 + XML embarqué</p>

          <button className="btn" onClick={handleFreeStart}>
            Commencer
          </button>

          <div className="counter">
            {freeCount} / {FREE_LIMIT} factures gratuites
          </div>
        </div>

        {step === 1 && (
          <div className="card">
            <h3>📄 Upload facture</h3>
            <div className="uploadBox">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button className="btn" onClick={handleGenerate}>
                Générer →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h3>🔍 Analyse IA en cours...</h3>
            <p>Extraction des données + conversion Factur-X</p>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>
            <p>Format Factur-X prêt</p>
            <button className="btn" onClick={handleGenerate}>
              Générer encore
            </button>
          </div>
        )}

        <section className="pricingSection">
          <h2 className="pricingTitle">Choisissez votre plan</h2>
          <p className="pricingSubtitle">
            Factures illimitées ou essayez gratuitement
          </p>

          <div className="pricing">
            <div className="plan">
              <h3>Gratuit</h3>

              <div className="priceRow">
                <div className="price">0€</div>
                <div className="per">/ mois</div>
              </div>

              <div className="underPrice">Pour tester Facturly</div>

              <div className="features">
                <div className="feature">
                  <span className="check">✓</span>
                  <span>10 factures par mois</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Extraction automatique par IA</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Génération XML Factur-X</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Conforme EN 16931</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Support par email</span>
                </div>
              </div>

              <button className="planButton free" onClick={handleFreeStart}>
                Commencer gratuitement
              </button>
            </div>

            <div className="plan pro">
              <div className="popular">POPULAIRE</div>

              <h3>Plan Pro</h3>

              <div className="priceRow">
                <div className="price">19€</div>
                <div className="per">/ mois</div>
              </div>

              <div className="underPrice">Pour les professionnels</div>

              <div className="features">
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Factures illimitées</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Extraction automatique par IA</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Génération XML Factur-X</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Conforme EN 16931</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Support prioritaire</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Historique complet</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Accès API</span>
                </div>
              </div>

              <button className="planButton pro" onClick={handleCheckout}>
                Passer au Pro
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
