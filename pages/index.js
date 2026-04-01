import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Home() {
  const router = useRouter();

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

    const data = await res.json();

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
    alert("Erreur génération facture");
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

        .container {
          max-width: 1000px;
          margin: auto;
          padding: 2rem;
        }

        header {
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          border: 1px solid #e5e7eb;
        }

        .logo {
          font-weight: 900;
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
          margin: 2rem 0;
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

/* FILIGRANE */
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

/* CONTENU AU-DESSUS */
.container {
  position: relative;
  z-index: 1;
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

          <div>
            {freeCount} / {FREE_LIMIT} factures gratuites
          </div>
        </div>

        {step === 1 && (
          <div className="card">
            <h3>📄 Upload facture</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className="btn" onClick={handleGenerate}>
              Générer →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h3>🔍 Analyse IA en cours...</h3>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>
            <button className="btn" onClick={handleGenerate}>
              Générer encore
            </button>
          </div>
        )}

        <div className="pricing">
          <div className="plan">
            <h3>Gratuit</h3>
            <p>10 factures</p>
            <button className="btn" onClick={handleFreeStart}>
              Start
            </button>
          </div>

          <div className="plan pro">
            <h3>Pro</h3>
            <p>19€/mois</p>
            <button className="btn" onClick={handleCheckout}>
              Passer Pro
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
