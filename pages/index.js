// pages/index.js
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleClick = () => {
    alert("Paiement !");
  };

  return (
  <>
    <header>
      <div className="logo">
        Factur<span>X</span>
      </div>

      <span className="badge-legale">
        Conforme EN 16931
      </span>
    </header>

    <div className="container">
      ...
    </div>
  </>
);
    <>
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f8f9fa;
          margin: 0;
        }

        .container {
          max-width: 800px;
          margin: auto;
          padding: 2rem;
        }

        .hero {
          text-align: center;
          margin-bottom: 2rem;
        }

        .btn {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: white;
          padding: 14px 22px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .steps {
          display: flex;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .step {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 14px;
          background: #eee;
        }

        .step.active {
          background: #4f46e5;
          color: white;
          font-weight: bold;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          border: 1px solid #ddd;
        }
      `}</style>

      <div className="container">
        <div className="hero">
          <button className="btn" onClick={handleClick}>
            🚀 Payer maintenant
          </button>

          <h1>Convertissez vos factures en Factur-X</h1>
          <p>IA + génération automatique conforme</p>
        </div>

        {/* STEPS */}
        <div className="steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>
            ÉTAPE 1
          </div>
          <div className={`step ${step === 2 ? "active" : ""}`}>
            ÉTAPE 2
          </div>
          <div className={`step ${step === 3 ? "active" : ""}`}>
            ÉTAPE 3
          </div>
        </div>

        {/* PAGE 1 */}
        {step === 1 && (
          <div className="card">
            <h3>Uploader une facture</h3>
            <input type="file" />

            <br /><br />

            <button className="btn" onClick={() => setStep(2)}>
              Continuer →
            </button>
          </div>
        )}

        {/* PAGE 2 */}
        {step === 2 && (
          <div className="card">
            <h3>Vérification des données</h3>

            <input placeholder="Numéro facture" />
            <br /><br />
            <input placeholder="Client" />

            <br /><br />

            <button onClick={() => setStep(1)}>Retour</button>
            <button className="btn" onClick={() => setStep(3)}>
              Générer →
            </button>
          </div>
        )}

        {/* PAGE 3 */}
        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>

            <p>Votre Factur-X est prêt.</p>

            <button onClick={() => setStep(1)}>
              Nouvelle facture
            </button>
          </div>
        )}
      </div>
    </>
  );
}

      <header>
        <div className="logo">Factur<span>X</span></div>
        <span className="badge-legale">Conforme EN 16931</span>
      </header>

      <div className="container">
   <div className="hero">
  <button
    id="payButton"
    style={{
      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
      color: "white",
      padding: "14px 22px",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
    onMouseOver={(e) => {
      e.target.style.transform = "scale(1.05)";
      e.target.style.boxShadow = "0 15px 35px rgba(79, 70, 229, 0.6)";
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.boxShadow = "0 10px 25px rgba(79, 70, 229, 0.4)";
    }}
    onClick={handleClick}
  >
    🚀 Payer maintenant
  </button>

  <h1>Convertissez vos factures en Factur-X</h1>
  <p>Uploadez votre facture — l'IA extrait les données automatiquement et génère le format légal.</p>

  <div className="hero-badges">
    <span className="hbadge">Obligation légale 2026-2027</span>
    <span className="hbadge">100% automatique</span>
    <span className="hbadge">Gratuit pour démarrer</span>
  </div>
</div>
  
          <h1>Convertissez vos factures en Factur-X</h1>
          <p>Uploadez votre facture — l'IA extrait les données automatiquement et génère le format légal.</p>
          <div className="hero-badges">
            <span className="hbadge">Obligation légale 2026-2027</span>
            <span className="hbadge">100% automatique</span>
            <span className="hbadge">Gratuit pour démarrer</span>
          </div>
        </div>

        <div className="steps">
          <div className="step active" id="step1"><span className="step-n">ÉTAPE 1</span>Import</div>
          <div className="step" id="step2"><span className="step-n">ÉTAPE 2</span>Vérification</div>
          <div className="step" id="step3"><span className="step-n">ÉTAPE 3</span>Export</div>
        </div>

        {/* PAGE 1 — UPLOAD */}
        <div id="page1">
          <div className="card">
            <div className="upload-zone" id="uploadZone">
              <input type="file" id="fileInput" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{display:'none'}} />
              <div className="upload-icon">📄</div>
              <h3>Déposez votre facture ici</h3>
              <p>Glissez-déposez ou cliquez pour sélectionner</p>
              <div className="format-badges">
                <span className="fbadge">PDF</span>
                <span className="fbadge">Word</span>
                <span className="fbadge">JPG/PNG</span>
              </div>
            </div>
          </div>

          <div className="card hidden" id="loadingCard">
            <p style={{fontSize:'14px', color:'#6B7280', marginBottom:'8px'}} id="loadingText">Analyse en cours...</p>
            <div className="loading-bar"><div className="loading-bar-fill"></div></div>
          </div>

          <div id="errorBox" className="error-box hidden"></div>

          <div style={{marginTop:'1rem', display:'flex', alignItems:'center', gap:'12px'}}>
            <span style={{fontSize:'13px', color:'#9CA3AF'}}>Pas de facture sous la main ?</span>
            <button className="btn btn-demo" id="btnDemo">Tester avec un exemple</button>
          </div>
        </div>

        {/* PAGE 2 — VÉRIFICATION */}
        <div id="page2" className="hidden">
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
              <h2 style={{fontSize:'16px', fontWeight:600}}>Données extraites par l'IA</h2>
              <span className="confidence" id="confScore">Confiance : 95%</span>
            </div>

            <div className="form-grid">
              <div className="fg"><label>Numéro de facture</label><input id="f_num" /></div>
              <div className="fg"><label>Date d'émission</label><input type="date" id="f_date" /></div>
              <div className="fg"><label>Date d'échéance</label><input type="date" id="f_echeance" /></div>
              <div className="fg"></div>

              <div className="section-sep">
                <div className="section-label">Émetteur</div>
              </div>
              <div className="fg full"><label>Raison sociale</label><input id="f_emetteur_nom" /></div>
              <div className="fg"><label>SIRET</label><input id="f_emetteur_siret" /></div>
              <div className="fg"><label>N° TVA</label><input id="f_emetteur_tva" /></div>
              <div className="fg full"><label>Adresse</label><input id="f_emetteur_adresse" /></div>

              <div className="section-sep">
                <div className="section-label">Client</div>
              </div>
              <div className="fg full"><label>Raison sociale</label><input id="f_client_nom" /></div>
              <div className="fg"><label>SIRET</label><input id="f_client_siret" /></div>
              <div className="fg full"><label>Adresse</label><input id="f_client_adresse" /></div>
            </div>

            <div style={{borderTop:'1px solid #E5E7EB', marginTop:'1.5rem', paddingTop:'1.5rem'}}>
              <div className="section-label">Lignes de facture</div>
              <table className="lignes">
                <thead>
                  <tr>
                    <th style={{width:'42%'}}>Description</th>
                    <th>Qté</th>
                    <th>P.U. HT</th>
                    <th>TVA</th>
                    <th>Total HT</th>
                  </tr>
                </thead>
                <tbody id="lignesBody"></tbody>
              </table>
              <div className="totaux" id="totauxDiv"></div>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-secondary" id="btnRetour">Retour</button>
            <button className="btn btn-primary" id="btnGenerer">Générer Factur-X →</button>
          </div>
        </div>

        {/* PAGE 3 — EXPORT */}
        <div id="page3" className="hidden">
          <div className="card" style={{textAlign:'center', padding:'2.5rem 1.5rem'}}>
            <div className="success-circle">✓</div>
            <h2 style={{fontSize:'20px', fontWeight:700, marginBottom:'8px'}}>Facture Factur-X générée !</h2>
            <p id="resumeFacture" style={{fontSize:'14px', color:'#6B7280', marginBottom:'1.5rem'}}></p>
            <div style={{display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginBottom:'1.5rem'}}>
              <span className="fbadge">EN 16931 conforme</span>
              <span style={{background:'#DCFCE7',color:'#166534',fontSize:'12px',padding:'3px 10px',borderRadius:'6px',fontWeight:500}}>XML embarqué</span>
              <span style={{background:'#FEF9C3',color:'#854D0E',fontSize:'12px',padding:'3px 10px',borderRadius:'6px',fontWeight:500}}>PDF/A-3</span>
            </div>

            <div style={{textAlign:'left'}}>
              <p style={{fontSize:'12px',color:'#6B7280',marginBottom:'6px'}}>Aperçu XML Factur-X :</p>
              <div className="xml-preview" id="xmlPreview"></div>
            </div>

            <div style={{display:'flex', gap:'10px', justifyContent:'center', marginTop:'1.5rem', flexWrap:'wrap'}}>
              <button className="btn btn-success" id="btnTelecharger">Télécharger XML Factur-X</button>
              <button className="btn btn-secondary" id="btnNouveau">Nouvelle facture</button>
            </div>
          </div>

          <div className="card">
            <div className="section-label" style={{marginBottom:'12px'}}>Récapitulatif de conformité</div>
            <div className="conformite-grid">
              <div className="conf-item"><span className="check">✓</span> Numéro de facture</div>
              <div className="conf-item"><span className="check">✓</span> Date d'émission</div>
              <div className="conf-item"><span className="check">✓</span> SIRET émetteur</div>
              <div className="conf-item"><span className="check">✓</span> N° TVA intracommunautaire</div>
              <div className="conf-item"><span className="check">✓</span> SIRET client</div>
              <div className="conf-item"><span className="check">✓</span> Montants HT / TVA / TTC</div>
              <div className="conf-item"><span className="check">✓</span> XML EN 16931 embarqué</div>
              <div className="conf-item"><span className="check">✓</span> Format PDF/A-3</div>
            </div>
          </div>
        </div>
      </div>

    
}

