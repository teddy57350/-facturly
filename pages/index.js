import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);

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
    <div style={{ fontFamily: "Arial", padding: 20 }}>

      {/* HERO */}
      <h1>Factur-X SaaS</h1>
      <p>IA + génération Factur-X</p>

      {/* 🔥 BOUTON COMMENCER (FIXÉ) */}
      <button
        onClick={() => {
          console.log("CLICK HERO");
          setStep(1);
        }}
        style={{
          padding: "10px 20px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        Commencer
      </button>

      {/* STEP 1 */}
      {step === 1 && (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #ddd" }}>
          <h3>📄 Upload facture</h3>

          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log("FILE:", e.target.files[0]);
            }}
          />

          <br /><br />

          {/* 🔥 BOUTON GRATUIT FIXÉ */}
          <button
            onClick={() => {
              console.log("CLICK FREE");
              if (!file) {
                alert("Ajoute une facture");
                return;
              }
              setStep(2);
            }}
            style={{
              padding: "10px 20px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Continuer
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #ddd" }}>
          <h3>🔍 Analyse IA</h3>

          <button
            onClick={() => setStep(3)}
            style={{
              padding: "10px 20px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Générer
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #ddd" }}>
          <h3>✅ Facture générée</h3>

          <button
            onClick={() => setStep(0)}
            style={{
              padding: "10px 20px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Nouvelle facture
          </button>
        </div>
      )}

      {/* PRICING */}
      <div style={{ display: "flex", gap: 20, marginTop: 40 }}>

        {/* FREE */}
        <div style={{ border: "1px solid #ddd", padding: 20, width: 200 }}>
          <h3>Gratuit</h3>
          <p>10 factures / mois</p>

          {/* 🔥 FIX COMMENCER FREE */}
          <button
            onClick={() => {
              console.log("CLICK FREE PLAN");
              setStep(1);
            }}
            style={{
              padding: "10px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Commencer
          </button>
        </div>

        {/* PRO */}
        <div style={{ border: "2px solid black", padding: 20, width: 200 }}>
          <h3>Pro</h3>
          <p>Illimité</p>

          <button
            onClick={handleCheckout}
            style={{
              padding: "10px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Passer Pro
          </button>
        </div>

      </div>
    </div>
  );
}
