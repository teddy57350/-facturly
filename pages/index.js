// pages/index.js
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <>
      {/* GLOBAL STYLE */}
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
      `}</style>

      {/* HEADER */}
      <header>
        <div className="logo">FacturX SaaS</div>
        <div className="badge">EN 16931</div>
      </header>

      <div className="container">

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
            <p>Format Factur-X prêt</p>

            <button className="btn" onClick={() => setStep(1)}>
              Nouvelle facture
            </button>

            <div className="invoice">
              <h2>🧾 FACTURE #INV-001</h2>
              <p>Total : 19€</p>
            </div>
          </div>
        )}

        {/* PRICING */}
        <div className="pricing">

          <div className="plan">
            <h3>Gratuit</h3>
            <div className="price">0€</div>

            <button className="btn">
              Commencer
            </button>
          </div>

          <div className="plan pro">
            <h3>Pro</h3>
            <div className="price">19€</div>

            <button className="btn" onClick={handleCheckout}>
              Passer Pro
            </button>
          </div>

        </div>

      </div>
    </>
  );
}ault function Home() {
  const [step, setStep] = useState(0);

  return (
    <>
      {/* GLOBAL STYLE */}
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
`}</style>

      {/* HEADER */}
      <header>
        <div className="logo">FacturX SaaS</div>
        <div className="badge">EN 16931</div>
      </header>

      <div className="container">

        {/* HERO */}
        <div className="hero">
          <h1>Factur-X automatique</h1>
          <p>IA + génération PDF/A-3 + XML embarqué</p>

         <button className="btn" onClick={() => alert("CLICK OK")}>
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
          <>
            <div className="card">
              <h3>✅ Facture générée</h3>
              <p>Format Factur-X prêt</p>

              <button className="btn" onClick={() => setStep(0)}>
                Nouvelle facture
              </button>
            </div>

            {/* 🧾 FACTURE VISUELLE */}
            <div className="invoice">

              <h2>🧾 FACTURE #INV-001</h2>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p><b>FacturX SaaS</b></p>
                  <p>Entreprise Demo</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p><b>Date :</b> 01/01/2026</p>
                  <p><b>Client :</b> ACME Corp</p>
                </div>
              </div>

              <hr />

              <table width="100%" cellPadding="8">
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th align="left">Description</th>
                    <th>Qté</th>
                    <th>Prix</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Abonnement SaaS Pro</td>
                    <td align="center">1</td>
                    <td align="center">19€</td>
                    <td align="center">19€</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ textAlign: "right" }}>
                Total : 19€
              </h3>

            </div>

            {/* 💻 HTML CONVERSION */}
            <div className="htmlBox">

{`<div class="invoice">
  <h2>FACTURE #INV-001</h2>

  <p>FacturX SaaS</p>
  <p>Client: ACME Corp</p>
  <p>Date: 01/01/2026</p>

  <table>
    <tr>
      <td>Abonnement SaaS Pro</td>
      <td>1</td>
      <td>19€</td>
    </tr>
  </table>

  <h3>Total: 19€</h3>
</div>`}

            </div>
          </>
        )}

        {/* PRICING */}
   import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

 return (
  <>
    <div className="hero">
      <h1>Factur-X automatique</h1>
      <p>IA + génération PDF/A-3 + XML embarqué</p>

      <button className="btn" onClick={() => alert("CLICK OK")}>
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
      <>
        <div className="card">
          <h3>✅ Facture générée</h3>
          <p>Format Factur-X prêt</p>

          <button className="btn" onClick={() => setStep(1)}>
            Nouvelle facture
          </button>
        </div>

        <div className="invoice">
          <h2>🧾 FACTURE #INV-001</h2>
          <p>Total : 19€</p>
        </div>
      </>
    )}

    {/* PRICING */}
    <div className="pricing">
      <div className="plan">
        <h3>Gratuit</h3>
        <div className="price">0€</div>

        <button className="btn">Commencer</button>
      </div>

      <div className="plan pro">
        <h3>Pro</h3>
        <div className="price">19€</div>

        <button className="btn" onClick={handleCheckout}>
          Passer Pro
        </button>
      </div>
    </div>
  </>
);
