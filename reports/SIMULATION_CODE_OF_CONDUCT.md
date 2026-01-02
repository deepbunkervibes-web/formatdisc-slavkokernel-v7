
# 📜 FormatDisc OPS  
## Code of Conduct za MVP Simulaciju  
**Verzija:** 1.0  
**Status:** Canonical  
**Primjena:** Sve simulacije korištene u validaciji, pitchu i fundraisingu

---

## 1️⃣ Definicija simulacije

### 1.1 Što simulacija jest
Simulacija je **kontrolirani softverski artefakt** koji dinamički prikazuje funkcionalnost, logiku i korisničko iskustvo proizvoda na temelju već dokumentiranih OPS specifikacija. To je **izvršna reprezentacija OPS istine** koja služi kao alat za komunikaciju s investitorima u fazi External Validation.

**Primjer (Checkout scenarij):**  
Simulacija checkout toka temelji se na postojećem OPS dokumentu "User Journey Map - E-commerce" i reproducira svaki korak s determinističkim podacima.

### 1.2 Što simulacija nije
Simulacija **nije MVP** – ne zahtijeva radnu infrastrukturu.  
Simulacija **nije Proof of Concept** – ne dokazuje tehničku izvedivost.  
Simulacija **nije produkcijski kod** – ne može se deployati bez značajnog prepisivanja.

**Ključna razlika:**  
Simulacija demonstrira **razumijevanje problema**, dok MVP dokazuje **sposobnost rješavanja**. Simulacija je alat za priču, ne za izgradnju.

---

## 2️⃣ Dopuštene prakse

### 2.1 Simulacija poslovne logike
**Dopušteno:** Simulirati pravila koja su eksplicitno dokumentirana u OPS Business Logic Spec.

**Primjer (Checkout):**  
Ako OPS dokument navodi: "Popust od 10% za narudžbe preko 100€", simulacija smije dinamički izračunati i prikazati taj popust.

**Uvjet:** Pravilo mora biti jednostavno testabilno (isti uvjeti → isti rezultat).

### 2.2 Simulacija korisničkih tokova
**Dopušteno:** Simulirati cjelovite korisničke tokove koji odgovaraju OPS User Journey Map.

**Primjer (Checkout):**  
Simulacija smije voditi korisnika kroz: 1) odabir proizvoda, 2) košaricu, 3) dostavu, 4) plaćanje, 5) potvrdu – baš kako je definirano u journey mapi.

**Ograničenje:** Ne smije se dodavati korake koji nisu dokumentirani bez ažuriranja OPS-a.

### 2.3 Simulacija arhitekture i API komunikacije
**Dopušteno:** Simulirati pozadinsku komunikaciju između komponenti s umjetnom latencijom (100-500ms).

**Primjer (Checkout):**  
Simulacija smije prikazati loading spinner nakon klika na "Plati", čime sugerira pozadinski API poziv Payment Gateway-u.

**Pravilo:** Latencija mora biti realistična (ne instant, ne preduga).

### 2.4 Vizualizacija podataka
**Dopušteno:** Koristiti determinističke vizualizacije temeljene na dokumentiranim metrikama.

**Primjer (Checkout):**  
Simulacija smije prikazati grafikon prodaje koji koristi unaprijed generirane, seedane podatke.

**Uvjet:** Podaci moraju biti reproducibilni – isti seed daje isti grafikon.

---

## 3️⃣ Zabranjene prakse (crvene linije)

### 3.1 Zabranjena simulacija tehnologija bez arhitekture
**Zabranjeno:** Simulirati AI/ML funkcionalnost bez definiranog modela, ulaznih podataka ili evaluacijskih metrika.

**Primjer:** Ne smijete simulirati "personalizirane preporuke" ako OPS ne sadrži specifikaciju algoritma ili izvora podataka.

### 3.2 Zabranjene integracije
**Zabranjeno:** Simulirati integraciju s vanjskim servisima (npr. Stripe, SendGrid) bez proučavanja njihovog API-ja i bez plana implementacije.

**Obrazloženje:** To stvara lažna očekivanja o tehničkoj izvedivosti.

### 3.3 Zabranjeni implicitni claimovi
**Zabranjeno:** Sugerirati performanse, skalabilnost ili pouzdanost koji nisu dokazani ili dokumentirani.

**Primjer:** Ne smijete simulirati "instant response times" ako sustav u stvarnosti ovisi o sporim vanjskim API-jima.

### 3.4 Zabranjeno prikrivanje ograničenja
**Zabranjeno:** Kreirati simulaciju koja izgleda kao potpuni proizvod bez disclosure note.

**Princip:** Svaka simulacija mora imati ugrađenu transparentnost.

---

## 4️⃣ Disclosure standard

### 4.1 Obavezna Disclosure nota
**Pravilo:** Svaka simulacija korištena u eksternoj komunikaciji (investitori, partneri) mora biti popraćena disclosure notom.

**Mjesto prikaza:** Mora biti vidljivo prije početka demo-a (npr. pozdravni ekran) ili u pisanom materijalu koji prati prezentaciju.

### 4.2 Struktura Disclosure note
**Obavezni elementi:**
1. **Što je simulirano:** Popis funkcionalnosti koje su "fake" ili demonstrativne.
2. **Što je spremno za razvoj:** Komponente koje su detaljno dokumentirane i spremne za implementaciju.
3. **Što nije obećano:** Eksplicitno navođenje ograničenja i ne-dokazanih tvrdnji.

**Primjer (Checkout):**  
"Simulirano: API komunikacija s payment gateway-em. Spremno za razvoj: Data model, business rules. Nije obećano: Performanse pod opterećenjem."

### 4.3 Odgovornost za disclosure
**Vlasnik:** Product Owner/CEO je odgovoran za točnost i potpunost disclosure note.

**Ažuriranje:** Disclosure mora biti ažuriran prije svake nove prezentacije ako su se promijenili uvjeti.

---

## 5️⃣ Proces validacije simulacije

### 5.1 Preduvjeti za validaciju
**Potrebni OPS artefakti prije početka simulacije:**
- User Journey Map (verificirana)
- Business Logic Spec (potpisana)
- Data Model (potvrđen)
- UI/UX Prototype (odobren)

### 5.2 Uloge u validaciji
**Tehnička validacija (Tech Lead):** Provjerava da simulacija odgovara arhitekturi i pravilima.

**Poslovna validacija (Product Owner):** Provjerava da simulacija prikazuje ispravne poslovne tokove.

**OPS validacija (OPS Manager):** Provjerava usklađenost s OPS dokumentacijom.

### 5.3 Statusi simulacije
**Draft:** U izradi, nije spremna za prezentaciju.

**Simulated:** Prošla internu validaciju, spremna za kontroliranu demonstraciju.

**Verified:** Prošla sve validacije, priložena disclosure nota, spremna za investitore.

### 5.4 Pravila korištenja po statusu
**Draft:** Samo interni tim.

**Simulated:** Interni tim + povjerljivi vanjski savjetnici (pod NDA).

**Verified:** Eksterni investitori i partneri.

---

## 6️⃣ Upravljanje dokumentom

### 6.1 Verzije i izmjene
**Proces promjene:** Sve izmjene ovog Code of Conducta moraju biti predložene OPS Manageru i odobrene od strane Tech Leada i Product Ownera.

**Verzioniranje:** Semantic versioning (MAJOR.MINOR.PATCH). Major promjene zahtijevaju obuku tima.

### 6.2 Odnos prema OPS-u
**Hijerarhija:** OPS dokumentacija je izvor istine. Simulacija je izvedenica. Ako postoji sukob, OPS ima prednost.

**Konflikti:** Ako simulacija otkrije nedosljednost u OPS-u, OPS se mora ažurirati prije nego što se simulacija koristi dalje.

---

## Zaključna izjava

Simulacija je moćan alat za dokazivanje dubokog razumijevanja problema i rješenja. Kada se koristi etički i transparentno, ona ubrzava fundraising, gradi povjerenje i postavlja temelje za uspješnu implementaciju.

**Naše obećanje:** Kao tim, obvezujemo se koristiti simulaciju isključivo kao alat za demonstraciju onoga što razumijemo i možemo izgraditi – nikad kao sredstvo za stvaranje lažnih očekivanja.

**Simulacija dokazuje razumijevanje.  
Izgradnja dokazuje izvršenje.**

---

**Dokument potvrdili:**  
[Tech Lead] ___________________ Datum: ________  
[Product Owner] ___________________ Datum: ________  
[OPS Manager] ___________________ Datum: ________
