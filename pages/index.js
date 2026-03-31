import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState("home");

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("Erreur Stripe");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: Arial;
          background: #f6f7fb;
        }

        .container {
          max-width: 1000px;
          margin: auto;
          padding: 20px;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }

        .logo {
          font-weight: bold;
        }

        .tabs {
          display: flex;
          gap: 10px;
        }

        .tab {
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          background: #eee;
          font-size: 14px;
        }

        .tab.active {
          background: #4f46e5;
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
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
        }

        .plan {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 10px;
          width: 250px;
        }

        .pricing {
          display: flex;
          gap: 20px;
          margin-top: 30px;
        }
      `}</style>

      <div className="container">

        {/* HEADER */}
        <header>
          <div className="logo">FacturX SaaS 🚀</div>

          <div className="tabs">
            <div
              className={`tab ${tab === "home" ? "active" : ""}`}
              onClick={() => setTab("home")}
            >
              🚀 Commencer
            </div>

            <div
              className={`tab ${tab === "auth" ? "active" : ""}`}
              onClick={() => setTab("auth")}
            >
              👤 Connexion
            </div>
          </div>
        </header>

        {/* HOME */}
        {tab === "home" && (
          <>
            <div className="card">
              <h1>Factur-X automatique</h1>
              <p>Conversion facture → PDF/A-3 + XML (EN 16931)</p>

              <button className="btn" onClick={() => alert("Upload bientôt")}>
                Upload facture
              </button>
            </div>

            {/* PRICING */}
            <div className="pricing">

              <div className="plan">
                <h3>Gratuit</h3>
                <p>10 factures / mois</p>
                <button className="btn" onClick={() => alert("Free activé")}>
                  Commencer
                </button>
              </div>

              <div className="plan">
                <h3>Pro</h3>
                <p>Illimité</p>
                <button className="btn" onClick={handleCheckout}>
                  Passer Pro
                </button>
              </div>

            </div>
          </>
        )}

        {/* AUTH */}
        {tab === "auth" && (
          <div className="card">
            <h2>Connexion / Inscription</h2>

            <input placeholder="Email" style={{ width: "100%", padding: 10, marginTop: 10 }} />
            <input placeholder="Mot de passe" type="password" style={{ width: "100%", padding: 10, marginTop: 10 }} />

            <button className="btn">
              Se connecter
            </button>
          </div>
        )}

      </div>
    </>
  );
}
