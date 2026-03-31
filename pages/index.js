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
    setStep(1);
  }
};
    // 2. PDF
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
    a.download = "facture.pdf";
    a.click();

    setStep(0);

  } catch (err) {
    console.error(err);
    alert("Erreur génération facture");
    setStep(0);
  }
};

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

    // ✅ IMPORTANT : on récupère un fichier
    const blob = await res.blob();

    // ✅ création d’un lien de téléchargement
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "facture_facturx.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // compteur gratuit
    setFreeCount((prev) => prev + 1);

    setStep(3);

  } catch (err) {
    console.error(err);
    alert("Erreur IA");
    setStep(1);
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
          transition: all 0.25s ease;
          box-shadow: 0 10px 25px rgba(79,70,229,0.25);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(79,70,229,0.4);
        }

        .pricing {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 3rem;
        }

        .plan {
          width: 280px;
          padding: 2rem;
          border-radius: 16px;
          background: white;
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .plan.pro {
          background: linear-gradient(135deg, #111827, #1f2937);
          color: white;
        }

        .price {
          font-size: 34px;
          font-weight: 800;
          margin: 10px 0;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 14px;
          margin-top: 20px;
          border: 1px solid #eee;
        }

        .counter {
          margin-top: 10px;
          font-size: 14px;
        }
      `}</style>

      <div className="container">
        <header>
          <div className="logo">FacturX SaaS 🚀</div>
          <div className="badge">EN 16931</div>
        </header>

        <div className="hero">
          <h1>Factur-X automatique ✨</h1>
          <p>IA + génération PDF/A-3 + XML embarqué</p>

          <button className="btn" onClick={handleFreeStart}>
            Commencer
          </button>

          <div className="counter">
            {freeCount} / {FREE_LIMIT} factures gratuites utilisées
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="card">
            <h3>📄 Upload facture</h3>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <br />

            <button className="btn" onClick={handleGenerate}>
              Générer →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="card">
            <h3>🔍 Analyse IA en cours...</h3>
            <p>Extraction des données + conversion Factur-X</p>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>
            <p>Format Factur-X prêt</p>

            <button className="btn" onClick={handleSaaSGenerate}>
           🚀 Générer ma facture
            </button>
          </div>
        )}

        {/* PRICING */}
        <div className="pricing">
          <div className="plan">
            <h3>Gratuit</h3>
            <div className="price">0€</div>

            <p>
              ✔ 10 factures / mois<br />
              ✔ Export Factur-X<br />
              ✔ Support standard
            </p>

            <button className="btn" onClick={handleFreeStart}>
              Commencer
            </button>
          </div>

          <div className="plan pro">
            <h3>Pro</h3>
            <div className="price">19€</div>

            <p>
              ✔ Factures illimitées<br />
              ✔ IA avancée<br />
              ✔ Export premium<br />
              ✔ Support prioritaire
            </p>

            <button className="btn" onClick={handleCheckout}>
              Passer Pro
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
