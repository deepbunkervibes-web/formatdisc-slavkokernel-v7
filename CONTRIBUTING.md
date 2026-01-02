# CONTRIBUTING — SlavkoShell OS

SlavkoShell je suvereni operativni sustav. Svi doprinosi moraju poštovati
kanonsku arhitekturu, doktrinu i zero-drift principe.

## Principles
1. Canonical State First — nikad ne uvoditi implicitna stanja.
2. Deterministic Execution — sve funkcije moraju biti reproducibilne.
3. Auditability — svaka promjena mora biti transparentna i logirana.
4. Minimalism Outside — UI ostaje čist, tih i institucionalan.
5. Orchestration Inside — unutarnji sloj je eksplicitno moćan.

## Contribution Rules
- Svaki PR mora sadržavati opis transakcije.
- Nema skrivenih side‑effecta.
- Nema magije, implicitnih pretpostavki ili “helper” skripti.
- Kod mora biti u skladu s FormatDisc standardom.

## Branching
- `main` = canonical state
- `dev` = controlled divergence
- Feature grane moraju biti kratke i audit-safe.

## Commit Style
Koristiti SlavkoShell Badge Pack za identitet i jasnoću.
