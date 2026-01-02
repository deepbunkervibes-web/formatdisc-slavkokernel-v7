# ███ SLAVKOSHELL OS — VERIFICATION PROTOCOL v1.0
*(Deterministic Sovereign State Validation — FormatDisc)*

Ovaj protokol definira **jedini dopušteni postupak** za potvrdu da je
SlavkoShell OS u **kanonskom, suverenom i audit‑safe stanju** nakon
deploymenta na Cloudflare Pages ili bilo koju drugu edge platformu.

Verifikacija nije “testiranje funkcionalnosti”.
Verifikacija je **potvrda integriteta sustava**.

---

# 1. Deployment Integrity

## 1.1 Unified Build Verification
- [ ] `dist/` postoji  
- [ ] `dist/index.html` postoji  
- [ ] `dist/simulator/index.html` postoji  
- [ ] `dist/assets/` sadrži sve bundle artefakte  
- [ ] Build je reproducibilan (`npm run build:unified` → bez errora)

## 1.2 Cloudflare Pages Verification
- [ ] Projekt kreiran (`slavkoshell-os`)  
- [ ] Upload uspješan (≥ 40 datoteka)  
- [ ] Preview URL aktivan (`*.pages.dev`)  
- [ ] Edge cache inicijaliziran  

---

# 2. Domain Sovereignty

## 2.1 DNS Handshake
- [ ] `formatdisc.hr` povezan s Pages projektom  
- [ ] SSL/TLS → Full (Strict)  
- [ ] Canonical redirect: `www → apex`  
- [ ] DNS propagacija potvrđena (A/CNAME aktivan)

## 2.2 Domain Routing
- [ ] `https://formatdisc.hr` otvara Root Cockpit  
- [ ] `https://formatdisc.hr/simulator` otvara Enterprise Simulator  
- [ ] Nema 404, 403, 500 ili CORS grešaka  

---

# 3. Runtime Verification

## 3.1 Root Cockpit
- [ ] MvpStudio se učitava bez errora  
- [ ] ChatInterface renderira i prihvaća input  
- [ ] KernelTerminal se inicijalizira  
- [ ] Nema TypeScript runtime grešaka u konzoli  
- [ ] UI je deterministički (bez flickera, bez race conditiona)

## 3.2 Enterprise Simulator
- [ ] Terminal prikazuje inicijalne audit logove  
- [ ] SVG cockpit renderiran  
- [ ] Input polje aktivno  
- [ ] Simulator reagira na komande

### 3.2.1 Status Command
U terminal upiši:

```
status
```

Očekivani canonical output:

```
[OK] SlavkoShell Simulator Online
[Kernel] Deterministic Mode: ACTIVE
[Audit] Log Stream: READY
[State] Canonical
```

Ako output odstupa → sustav nije u canonical stateu.

---

# 4. Cross‑Layer Consistency

- [ ] Root i Simulator prikazuju isti identitet (verzija, badge, naziv OS‑a)  
- [ ] Manifesto, Whitepaper i README su u skladu s prikazanim UI‑em  
- [ ] Nema razlika između dokumentacije i runtime ponašanja  
- [ ] Fusion/Protocol slojevi su referencirani u oba sloja OS‑a  

---

# 5. Sovereign State Confirmation

Ako su svi checkboxovi označeni:

```
SLAVKOSHELL OS — CANONICAL STATE: VERIFIED
SOVEREIGN EXECUTION: ACTIVE
ZERO DRIFT: ENFORCED
AUDIT TRAIL: CLEAN
```

Ako bilo koji element padne:

```
STATE: NON-CANONICAL
ACTION REQUIRED: REBUILD OR REDEPLOY
```

---

# 6. Signature

Ovaj protokol je ratificiran kao dio
**SlavkoShell OS Governance Charter v1.0**  
i mora se izvršiti nakon svakog deploymenta.
