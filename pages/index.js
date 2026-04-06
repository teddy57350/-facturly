import { useState } from "react";

const FREE_LIMIT = 10;

export default function Home() {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(0);
  const [freeCount, setFreeCount] = useState(0);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFreeStart = () => {
    if (freeCount >= FREE_LIMIT) {
      alert("Limite gratuite atteinte (10 factures). Passez en Pro pour continuer.");
      return;
    }

    setStep(1);
    setError("");

    setTimeout(() => {
      const el = document.getElementById("upload");
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const handleGenerate = async () => {
    if (!file) {
      setError("Veuillez sélectionner une facture.");
      return;
    }
    setStep(2);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/invoice/convert", { method: "POST", body: formData });
      const raw = await res.text();
      if (!res.ok) throw new Error(raw);

      const data = JSON.parse(raw);
      let facture;
      try { facture = JSON.parse(data.ai); } catch { facture = data.ai; }

      const res2 = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facture }),
      });

      if (!res2.ok) { const raw2 = await res2.text(); throw new Error(raw2); }

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
      setError("Erreur : " + err.message);
      setStep(1);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f9fa; color: #1a1a2e; }

        .topbar { background: #fff; border-bottom: 1px solid #e8ecf0; padding: 0 2rem; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
        .logo { font-size: 20px; font-weight: 700; color: #1a1a2e; letter-spacing: -0.5px; }
        .logo span { color: #2563eb; }
        .badge-top { background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }

        .hero { background: #fff; border-bottom: 1px solid #e8ecf0; padding: 4rem 2rem 3rem; text-align: center; }
        .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px; margin-bottom: 1.5rem; }
        .hero h1 { font-size: clamp(28px, 5vw, 48px); font-weight: 800; color: #1a1a2e; line-height: 1.2; margin-bottom: 1rem; letter-spacing: -1px; }
        .hero h1 span { color: #2563eb; }
        .hero p { font-size: 18px; color: #64748b; max-width: 560px; margin: 0 auto 2rem; line-height: 1.6; }
        .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-hero { padding: 14px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.15s; border: none; }
        .btn-primary { background: #2563eb; color: #fff; }
        .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
        .btn-outline { background: transparent; color: #2563eb; border: 2px solid #2563eb; }
        .btn-outline:hover { background: #eff6ff; }

        .urgency { background: #fef2f2; border: 1px solid #fecaca; padding: 1rem 2rem; text-align: center; }
        .urgency p { font-size: 14px; color: #991b1b; font-weight: 500; }
        .urgency strong { font-weight: 700; }

        .main { max-width: 680px; margin: 0 auto; padding: 2.5rem 1rem; }

        .counter-bar { background: #fff; border: 1px solid #e8ecf0; border-radius: 10px; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
        .counter-label { font-size: 13px; color: #64748b; }
        .counter-value { font-size: 13px; font-weight: 600; color: #2563eb; }

        .card { background: #fff; border: 1px solid #e8ecf0; border-radius: 14px; padding: 2rem; margin-bottom: 1.5rem; }
        .card h3 { font-size: 18px; font-weight: 700; color: #1a1a2e; margin-bottom: 1rem; }

        .upload-zone { border: 2px dashed #cbd5e1; border-radius: 10px; padding: 2.5rem 1rem; text-align: center; cursor: pointer; transition: all 0.15s; background: #f8fafc; }
        .upload-zone.dragging { border-color: #2563eb; background: #eff6ff; }
        .upload-zone:hover { border-color: #94a3b8; }
        .upload-icon { font-size: 32px; margin-bottom: 8px; }
        .upload-zone h4 { font-size: 15px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
        .upload-zone p { font-size: 13px; color: #94a3b8; margin-bottom: 12px; }
        .file-formats { display: flex; gap: 6px; justify-content: center; }
        .fmt { background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; }

        .file-selected { display: flex; align-items: center; gap: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 14px; margin-top: 12px; }
        .file-name { font-size: 13px; font-weight: 600; color: #166534; flex: 1; }
        .file-remove { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 16px; }

        .btn-generate { width: 100%; padding: 14px; background: #2563eb; color: #fff; border: none; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; margin-top: 1rem; transition: all 0.15s; }
        .btn-generate:hover { background: #1d4ed8; }
        .btn-generate:disabled { background: #94a3b8; cursor: not-allowed; }

        .loading-card { text-align: center; padding: 3rem 2rem; }
        .spinner { width: 44px; height: 44px; border: 3px solid #e8ecf0; border-top-color: #2563eb; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-card h3 { font-size: 18px; font-weight: 700; color: #1a1a2e; margin-bottom: 6px; }
        .loading-card p { font-size: 14px; color: #64748b; }

        .success-card { text-align: center; padding: 2.5rem 2rem; }
        .success-icon { width: 60px; height: 60px; background: #f0fdf4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 26px; }
        .success-card h3 { font-size: 20px; font-weight: 700; color: #1a1a2e; margin-bottom: 6px; }
        .success-card p { font-size: 14px; color: #64748b; margin-bottom: 1.5rem; }
        .badges-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .badge { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
        .badge-green { background: #f0fdf4; color: #166534; }
        .badge-blue { background: #eff6ff; color: #1d4ed8; }
        .btn-again { padding: 12px 24px; background: #1a1a2e; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }

        .error-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px 16px; margin-bottom: 1rem; font-size: 13px; color: #991b1b; }

        .how { padding: 3rem 2rem; background: #fff; border-top: 1px solid #e8ecf0; border-bottom: 1px solid #e8ecf0; }
        .how-inner { max-width: 680px; margin: 0 auto; }
        .section-label { font-size: 12px; font-weight: 700; color: #2563eb; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
        .section-title { font-size: 28px; font-weight: 800; color: #1a1a2e; margin-bottom: 2rem; letter-spacing: -0.5px; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; }
        .step-item { text-align: center; }
        .step-num { width: 40px; height: 40px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #2563eb; margin: 0 auto 10px; }
        .step-item h4 { font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
        .step-item p { font-size: 13px; color: #64748b; line-height: 1.5; }

        .pricing-section { max-width: 680px; margin: 0 auto; padding: 3rem 1rem; }
        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 540px) { .pricing-grid { grid-template-columns: 1fr; } }
        .plan-card { background: #fff; border: 1px solid #e8ecf0; border-radius: 14px; padding: 1.75rem; position: relative; }
        .plan-card.popular { border: 2px solid #2563eb; }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #2563eb; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px; white-space: nowrap; }
        .plan-name { font-size: 16px; font-weight: 700; color: #1a1a2e; margin-bottom: 6px; }
        .plan-price { font-size: 36px; font-weight: 800; color: #1a1a2e; margin-bottom: 2px; }
        .plan-price span { font-size: 16px; font-weight: 400; color: #94a3b8; }
        .plan-desc { font-size: 13px; color: #64748b; margin-bottom: 1.25rem; }
        .plan-features { list-style: none; margin-bottom: 1.5rem; }
        .plan-features li { font-size: 13px; color: #374151; padding: 5px 0; display: flex; align-items: center; gap: 8px; }
        .plan-features li::before { content: "✓"; color: #2563eb; font-weight: 700; flex-shrink: 0; }
        .plan-btn { width: 100%; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
        .plan-btn.free { background: #f1f5f9; color: #1a1a2e; }
        .plan-btn.free:hover { background: #e2e8f0; }
        .plan-btn.pro { background: #2563eb; color: #fff; }
        .plan-btn.pro:hover { background: #1d4ed8; }

        .faq { background: #fff; border-top: 1px solid #e8ecf0; padding: 3rem 2rem; }
        .faq-inner { max-width: 680px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid #e8ecf0; padding: 1.25rem 0; }
        .faq-item:last-child { border-bottom: none; }
        .faq-q { font-size: 15px; font-weight: 600; color: #1a1a2e; margin-bottom: 6px; }
        .faq-a { font-size: 14px; color: #64748b; line-height: 1.6; }

        .footer { background: #1a1a2e; color: #94a3b8; text-align: center; padding: 1.5rem; font-size: 13px; }
        .footer a { color: #94a3b8; text-decoration: none; margin: 0 8px; }
        .footer a:hover { color: #fff; }
      `}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="logo">Factur<span>AI</span></div>
        <div className="badge-top">EN 16931 CONFORME</div>
      </div>

      {/* URGENCE */}
      <div className="urgency">
        <p>Obligation légale : facturation électronique <strong>Factur-X obligatoire dès septembre 2026</strong> pour les grandes entreprises — et <strong>2027 pour les TPE/PME</strong>.</p>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">Propulsé par IA</div>
        <h1>Transformez vos factures<br />en <span>Factur-X</span> en 30 secondes</h1>
        <p>FacturAI transforme vos factures Word ou PDF en format légal Factur-X automatiquement. Zéro comptable. Zéro prise de tête.</p>
        <div className="hero-actions">
          <button className="btn-hero btn-primary" onClick={handleFreeStart}>Essayer gratuitement</button>
          <button className="btn-hero btn-outline" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>Voir les tarifs</button>
        </div>
      </div>

      {/* APP */}
      <div className="main" id="upload">
        <div className="counter-bar">
          <span className="counter-label">Factures gratuites utilisées</span>
          <span className="counter-value" suppressHydrationWarning>{freeCount} / {FREE_LIMIT}</span>
        </div>

        {error && <div className="error-box">{error}</div>}

        {step === 0 && (
          <div className="card" style={{ textAlign: 'center' }}>
            <h3>Commencez maintenant</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '14px' }}>10 conversions gratuites — aucune carte requise</p>
            <button className="btn-generate" onClick={handleFreeStart}>Convertir une facture →</button>
          </div>
        )}

        {step === 1 && (
          <div className="card">
            <h3>Importez votre facture</h3>
            <div
              className={`upload-zone ${dragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div className="upload-icon">📄</div>
              <h4>Glissez votre facture ici</h4>
              <p>ou cliquez pour sélectionner</p>
              <div className="file-formats">
                <span className="fmt">PDF</span>
                <span className="fmt">Word</span>
                <span className="fmt">JPG/PNG</span>
              </div>
              <input id="fileInput" type="file" style={{ display: 'none' }} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            {file && (
              <div className="file-selected">
                <span>📎</span>
                <span className="file-name">{file.name}</span>
                <button className="file-remove" onClick={() => setFile(null)}>✕</button>
              </div>
            )}

            <button className="btn-generate" onClick={handleGenerate} disabled={!file}>
              Générer Factur-X →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card loading-card">
            <div className="spinner"></div>
            <h3>Analyse en cours...</h3>
            <p>L'IA extrait les données et génère votre Factur-X</p>
          </div>
        )}

        {step === 3 && (
          <div className="card success-card">
            <div className="success-icon">✅</div>
            <h3>Facture Factur-X générée</h3>
            <p>Votre fichier a été téléchargé automatiquement.</p>
            <div className="badges-row">
              <span className="badge badge-green">EN 16931 conforme</span>
              <span className="badge badge-green">XML embarqué</span>
              <span className="badge badge-blue">PDF/A-3</span>
            </div>
            <button className="btn-again" onClick={() => { setStep(1); setFile(null); }}>Convertir une autre facture</button>
          </div>
        )}
      </div>

      {/* COMMENT CA MARCHE */}
      <div className="how">
        <div className="how-inner">
          <div className="section-label">Simple et rapide</div>
          <div className="section-title">Comment ça marche ?</div>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-num">1</div>
              <h4>Importez</h4>
              <p>Déposez votre facture PDF, Word ou image</p>
            </div>
            <div className="step-item">
              <div className="step-num">2</div>
              <h4>L'IA analyse</h4>
              <p>Extraction automatique de toutes les données</p>
            </div>
            <div className="step-item">
              <div className="step-num">3</div>
              <h4>Téléchargez</h4>
              <p>Votre Factur-X conforme EN 16931 est prêt</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing-section" id="pricing">
        <div className="section-label">Tarifs</div>
        <div className="section-title">Simple et transparent</div>
        <div className="pricing-grid">
          <div className="plan-card">
            <div className="plan-name">Gratuit</div>
            <div className="plan-price">0€ <span>/ mois</span></div>
            <div className="plan-desc">Pour tester FacturAI</div>
            <ul className="plan-features">
              <li>10 factures par mois</li>
              <li>Extraction automatique IA</li>
              <li>Génération XML Factur-X</li>
              <li>Conforme EN 16931</li>
              <li>Support par email</li>
            </ul>
            <button
              className="plan-btn"
              onClick={() => {
                const el = document.getElementById("upload");
                if (el) {
                  const yOffset = -80;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Commencer gratuitement
            </button>
          </div>

          <div className="plan-card popular">
            <div className="popular-badge">POPULAIRE</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price">9€ <span>/ mois</span></div>
            <div className="plan-desc">Pour les professionnels</div>
            <ul className="plan-features">
              <li>Factures illimitées</li>
              <li>Extraction automatique IA</li>
              <li>Génération XML Factur-X</li>
              <li>Conforme EN 16931</li>
              <li>Support prioritaire</li>
              <li>Historique complet</li>
              <li>Accès API</li>
            </ul>
            <button
              type="button"
              className="plan-btn pro"
              onClick={async () => {
                const res = await fetch("/api/stripe/checkout", { method: "POST" });
                const data = await res.json();

                if (data.url) {
                  window.location.href = data.url;
                } else {
                  alert("Erreur Stripe");
                }
              }}
            >
              Passer au Pro
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq">
        <div className="faq-inner">
          <div className="section-label">FAQ</div>
          <div className="section-title">Questions fréquentes</div>
          <div className="faq-item">
            <div className="faq-q">Est-ce vraiment conforme à la réglementation française ?</div>
            <div className="faq-a">Oui. FacturAI génère des fichiers conformes à la norme EN 16931 et au format Factur-X, le standard retenu par la France pour la facturation électronique obligatoire dès 2026-2027.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Mes données sont-elles sécurisées ?</div>
            <div className="faq-a">Vos factures sont traitées à la volée et ne sont jamais stockées sur nos serveurs. L'analyse est effectuée en temps réel puis les données sont supprimées immédiatement.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Quels formats de fichiers sont acceptés ?</div>
            <div className="faq-a">PDF, Word (.doc, .docx), et images (JPG, PNG). L'IA est capable d'extraire les données de n'importe quelle mise en page de facture.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">J'utilise déjà un logiciel de facturation — est-ce utile ?</div>
            <div className="faq-a">Oui. Si votre logiciel ne génère pas encore de Factur-X, FacturAI vous permet de convertir vos exports PDF en quelques secondes sans changer vos habitudes.</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p>© 2026 FacturAI — <a href="/mentions-legales">Mentions légales</a> <a href="/confidentialite">Confidentialité</a> <a href="/cgu">CGU</a></p>
      </div>
    </>
  );
}
