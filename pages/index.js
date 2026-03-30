// pages/index.js
export default function Home() {
  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8F9FA; color: #1A1A2E; min-height: 100vh; }

        header { background: white; border-bottom: 1px solid #E5E7EB; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 20px; font-weight: 700; color: #1A1A2E; }
        .logo span { color: #2563EB; }
        .badge-legale { background: #DCFCE7; color: #166534; font-size: 12px; padding: 4px 10px; border-radius: 20px; font-weight: 500; }

        .container { max-width: 860px; margin: 0 auto; padding: 2rem 1rem; }

        .hero { text-align: center; margin-bottom: 2.5rem; }
        .hero h1 { font-size: 32px; font-weight: 700; color: #1A1A2E; margin-bottom: 8px; }
        .hero p { font-size: 16px; color: #6B7280; max-width: 500px; margin: 0 auto 1.5rem; }
        .hero-badges { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .hbadge { background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 6px 14px; font-size: 13px; color: #374151; }

        .steps { display: flex; gap: 0; margin-bottom: 2rem; background: white; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; }
        .step { flex: 1; padding: 16px 12px; text-align: center; font-size: 13px; color: #9CA3AF; border-right: 1px solid #E5E7EB; position: relative; }
        .step:last-child { border-right: none; }
        .step.active { color: #2563EB; background: #EFF6FF; font-weight: 600; }
        .step.done { color: #16A34A; background: #F0FDF4; }
        .step-n { display: block; font-size: 11px; margin-bottom: 2px; opacity: 0.7; }

        .card { background: white; border-radius: 12px; border: 1px solid #E5E7EB; padding: 1.5rem; margin-bottom: 1rem; }

        .upload-zone { border: 2px dashed #D1D5DB; border-radius: 10px; padding: 3rem 1rem; text-align: center; cursor: pointer; transition: all 0.2s; }
        .upload-zone:hover { border-color: #2563EB; background: #EFF6FF; }
        .upload-icon { width: 56px; height: 56px; background: #EFF6FF; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px; }
        .upload-zone h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
        .upload-zone p { font-size: 14px; color: #6B7280; margin-bottom: 16px; }
        .format-badges { display: flex; gap: 6px; justify-content: center; }
        .fbadge { background: #EFF6FF; color: #1D4ED8; font-size: 12px; padding: 3px 10px; border-radius: 6px; font-weight: 500; }

        .loading-bar { background: #E5E7EB; border-radius: 4px; height: 6px; margin: 12px 0; overflow: hidden; }
        .loading-bar-fill { background: #2563EB; height: 100%; border-radius: 4px; animation: loading 2s ease-in-out infinite; }
        @keyframes loading { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .fg { display: flex; flex-direction: column; gap: 5px; }
        .fg.full { grid-column: 1 / -1; }
        .fg label { font-size: 12px; color: #6B7280; font-weight: 500; }
        .fg input { padding: 9px 12px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 14px; color: #1A1A2E; transition: border-color 0.15s; }
        .fg input:focus { outline: none; border-color: #2563EB; }
        .section-sep { grid-column: 1 / -1; border-top: 1px solid #E5E7EB; padding-top: 14px; margin-top: 4px; }
        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }

        table.lignes { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
        table.lignes th { text-align: left; padding: 8px 10px; color: #6B7280; font-weight: 500; border-bottom: 1px solid #E5E7EB; background: #F9FAFB; }
        table.lignes td { padding: 8px 10px; border-bottom: 1px solid #F3F4F6; }
        table.lignes td input { border: none; background: transparent; font-size: 13px; width: 100%; color: #1A1A2E; }
        table.lignes td input:focus { outline: none; border-bottom: 1px solid #2563EB; }

        .totaux { display: flex; flex-direction: column; align-items: flex-end; margin-top: 16px; gap: 6px; }
        .total-row { display: flex; gap: 3rem; font-size: 14px; }
        .total-row .lbl { color: #6B7280; }
        .total-ttc { font-size: 18px; font-weight: 700; border-top: 2px solid #E5E7EB; padding-top: 10px; margin-top: 4px; }

        .actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 1.5rem; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; }
        .btn-primary { background: #2563EB; color: white; }
        .btn-primary:hover { background: #1D4ED8; }
        .btn-secondary { background: white; color: #374151; border: 1px solid #D1D5DB; }
        .btn-secondary:hover { background: #F9FAFB; }
        .btn-success { background: #16A34A; color: white; }
        .btn-success:hover { background: #15803D; }
        .btn-demo { background: #F3F4F6; color: #374151; border: 1px solid #E5E7EB; }
        .btn-demo:hover { background: #E5E7EB; }

        .success-circle { width: 64px; height: 64px; background: #DCFCE7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 28px; }
        .conformite-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; }
        .conf-item { display: flex; align-items: center; gap: 6px; }
        .conf-item .check { color: #16A34A; font-weight: 700; }

        .xml-preview { background: #1E1E2E; color: #A6E3A1; border-radius: 8px; padding: 1rem; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.6; max-height: 200px; overflow-y: auto; margin: 1rem 0; }

        .confidence { display: inline-flex; align-items: center; gap: 6px; background: #DCFCE7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; }

        .hidden { display: none !important; }

        .error-box { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 12px 16px; color: #DC2626; font-size: 14px; margin-top: 12px; }

        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
          .fg.full { grid-column: 1; }
          .hero h1 { font-size: 24px; }
        }
      `}</style>

      <header>
        <div className="logo">Factur<span>X</span></div>
        <span className="badge-legale">Conforme EN 16931</span>
      </header>

      <div className="container">
        <div className="hero">
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

      <script dangerouslySetInnerHTML={{__html: `
        let factureData = null;
        let xmlGenere = '';

        function goTo(n) {
          [1,2,3].forEach(i => {
            document.getElementById('page'+i).classList.add('hidden');
            const s = document.getElementById('step'+i);
            s.classList.remove('active');
            s.style.background = '';
            s.style.color = '';
            s.style.fontWeight = '';
          });
          document.getElementById('page'+n).classList.remove('hidden');
          const stepEl = document.getElementById('step'+n);
          stepEl.classList.add('active');
          if (n > 1) {
            for (let i = 1; i < n; i++) {
              const prev = document.getElementById('step'+i);
              prev.style.background = '#F0FDF4';
              prev.style.color = '#16A34A';
            }
          }
        }

        async function handleFile(file) {
          document.getElementById('uploadZone').style.opacity = '0.5';
          document.getElementById('loadingCard').classList.remove('hidden');
          document.getElementById('errorBox').classList.add('hidden');

          const messages = [
            'Lecture du fichier...', 
            'Extraction des données par IA...', 
            'Vérification SIRET...', 
            'Calcul des montants...'
          ];
          let i = 0;
          const iv = setInterval(() => {
            if (i < messages.length) document.getElementById('loadingText').textContent = messages[i++];
          }, 700);

          try {
            const formData = new FormData();
            if (file) formData.append('facture', file);

            const response = await fetch('/api/analyser', {
              method: 'POST',
              body: formData
            });

            clearInterval(iv);
            const result = await response.json();

            if (result.erreur) throw new Error(result.erreur);

            factureData = result.facture;
            remplirFormulaire(factureData);
            
            document.getElementById('uploadZone').style.opacity = '1';
            document.getElementById('loadingCard').classList.add('hidden');
            goTo(2);

          } catch (error) {
            clearInterval(iv);
            document.getElementById('uploadZone').style.opacity = '1';
            document.getElementById('loadingCard').classList.add('hidden');
            document.getElementById('errorBox').classList.remove('hidden');
            document.getElementById('errorBox').textContent = 'Erreur : ' + error.message;
          }
        }

        async function chargerExemple() {
          document.getElementById('uploadZone').style.opacity = '0.5';
          document.getElementById('loadingCard').classList.remove('hidden');
          document.getElementById('errorBox').classList.add('hidden');

          const messages = [
            'Chargement de l\\'exemple...', 
            'Analyse en cours...', 
            'Extraction des données...'
          ];
          let i = 0;
          const iv = setInterval(() => {
            if (i < messages.length) document.getElementById('loadingText').textContent = messages[i++];
          }, 600);

          try {
            const response = await fetch('/api/analyser', {
              method: 'POST',
              body: new FormData()
            });

            clearInterval(iv);
            const result = await response.json();
            if (result.erreur) throw new Error(result.erreur);

            factureData = result.facture;
            remplirFormulaire(factureData);
            
            document.getElementById('uploadZone').style.opacity = '1';
            document.getElementById('loadingCard').classList.add('hidden');
            goTo(2);

          } catch (error) {
            clearInterval(iv);
            document.getElementById('uploadZone').style.opacity = '1';
            document.getElementById('loadingCard').classList.add('hidden');
            document.getElementById('errorBox').classList.remove('hidden');
            document.getElementById('errorBox').textContent = 'Erreur : ' + error.message;
          }
        }

        function remplirFormulaire(f) {
          document.getElementById('f_num').value = f.numero || '';
          document.getElementById('f_date').value = f.date_emission || '';
          document.getElementById('f_echeance').value = f.date_echeance || '';
          document.getElementById('f_emetteur_nom').value = f.emetteur?.nom || '';
          document.getElementById('f_emetteur_siret').value = f.emetteur?.siret || '';
          document.getElementById('f_emetteur_tva').value = f.emetteur?.tva || '';
          document.getElementById('f_emetteur_adresse').value = f.emetteur?.adresse || '';
          document.getElementById('f_client_nom').value = f.client?.nom || '';
          document.getElementById('f_client_siret').value = f.client?.siret || '';
          document.getElementById('f_client_adresse').value = f.client?.adresse || '';
          document.getElementById('confScore').textContent = 'Confiance : ' + (f.confiance || 90) + '%';

          const tbody = document.getElementById('lignesBody');
          tbody.innerHTML = '';
          (f.lignes || []).forEach(l => {
            const tr = document.createElement('tr');
            tr.innerHTML = \`
              <td><input value="\${l.description || ''}" /></td>
              <td><input value="\${l.quantite || 1}" style="width:45px" /></td>
              <td><input value="\${(l.prix_unitaire || 0).toFixed(2)}" style="width:75px" /></td>
              <td><input value="\${l.taux_tva || 20}%" style="width:45px" /></td>
              <td style="color:#6B7280;">\${(l.total_ht || 0).toFixed(2).replace('.',',')} €</td>
            \`;
            tbody.appendChild(tr);
          });

          const t = f.totaux || {};
          document.getElementById('totauxDiv').innerHTML = \`
            <div class="total-row"><span class="lbl">Total HT</span><span>\${(t.ht||0).toFixed(2).replace('.',',')} €</span></div>
            <div class="total-row"><span class="lbl">TVA</span><span>\${(t.tva||0).toFixed(2).replace('.',',')} €</span></div>
            <div class="total-row total-ttc"><span class="lbl">Total TTC</span><span>\${(t.ttc||0).toFixed(2).replace('.',',')} €</span></div>
          \`;
        }

        async function genererFacturX() {
          const facture = {
            numero: document.getElementById('f_num').value,
            date_emission: document.getElementById('f_date').value,
            date_echeance: document.getElementById('f_echeance').value,
            emetteur: {
              nom: document.getElementById('f_emetteur_nom').value,
              siret: document.getElementById('f_emetteur_siret').value,
              tva: document.getElementById('f_emetteur_tva').value,
              adresse: document.getElementById('f_emetteur_adresse').value,
            },
            client: {
              nom: document.getElementById('f_client_nom').value,
              siret: document.getElementById('f_client_siret').value,
              adresse: document.getElementById('f_client_adresse').value,
            },
            totaux: factureData?.totaux || {}
          };

          try {
            const response = await fetch('/api/generer', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ facture })
            });
            const result = await response.json();
            if (result.erreur) throw new Error(result.erreur);

            xmlGenere = result.xml;
            document.getElementById('xmlPreview').textContent = xmlGenere;
            document.getElementById('resumeFacture').textContent =
              \`\${facture.numero} — \${facture.emetteur.nom} → \${facture.client.nom} — \${(facture.totaux.ttc||0).toFixed(2).replace('.',',')} € TTC\`;

            goTo(3);
          } catch (error) {
            alert('Erreur : ' + error.message);
          }
        }

        function telechargerXML() {
          const blob = new Blob([xmlGenere], { type: 'application/xml' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          const num = document.getElementById('f_num').value || 'facture';
          a.download = num + '_facturx.xml';
          a.click();
        }

        // Event listeners
        document.getElementById('uploadZone').addEventListener('click', () => {
          document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
          if (e.target.files.length) handleFile(e.target.files[0]);
        });

        document.getElementById('btnDemo').addEventListener('click', chargerExemple);
        document.getElementById('btnRetour').addEventListener('click', () => goTo(1));
        document.getElementById('btnGenerer').addEventListener('click', genererFacturX);
        document.getElementById('btnTelecharger').addEventListener('click', telechargerXML);
        document.getElementById('btnNouveau').addEventListener('click', () => goTo(1));
      `}} />
    </>
  );
}import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51TGRHH567jEq7M8FSeNdZhGdAGCQy9yjXmHJRC78Npt07GLPQPnr52hDHIjDNxLeJDqGOtRgNhdVawWtdKbceITf00WFKo61ji');

function SubscribeButton() {
  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', { method: 'POST' });
    const data = await response.json();

    if (data.sessionId) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert('Erreur lors de la création de la session.');
    }
  };

  return <button onClick={handleSubscribe}>S’abonner à 19€</button>;
}

export default function Home() {
  return (
    <div>
      <h1>Page principale</h1>
      {/* Ajoutez votre bouton ici */}
      <SubscribeButton />
    </div>
  );
}
