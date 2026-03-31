import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

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

        .steps {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }

        .step {
          padding: 8px 12px;
          background: #eee;
          border-radius: 6px;
        }

        .active {
          background: black;
          color: white;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
        }

        .btn {
          padding: 10px 15px;
          background: black;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

      <div className="container">
        <header>
          <div className="logo">FacturX SaaS</div>
          <div className="badge">EN 16931</div>
        </header>

        <div className="steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>Upload</div>
          <div className={`step ${step === 2 ? "active" : ""}`}>Vérification</div>
          <div className={`step ${step === 3 ? "active" : ""}`}>Export</div>
        </div>

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

        {step === 2 && (
          <div className="card">
            <h3>🔍 Vérification IA</h3>
            <button className="btn" onClick={() => setStep(3)}>
              Générer →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>
            <button className="btn" onClick={() => setStep(1)}>
              Nouvelle facture
            </button>
          </div>
        )}

        <div className="card">
          <h3>💳 Pro</h3>
          <button className="btn" onClick={handleCheckout}>
            Passer Pro
          </button>
        </div>
      </div>
    </>
  );
}
