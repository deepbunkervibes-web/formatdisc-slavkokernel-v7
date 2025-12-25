/**
 * DESIGN CONSTITUTION - PRAVILA DIZAJNA
 * 
 * Ovaj dokument definira jasna pravila kako bi FormatDisc izgledao 
 * uredno, dosljedno i profesionalno.
 */

export const DesignRules = {
    // Što zapravo radimo?
    CORE_GOAL: "Osigurati da sve bude uredno, dosljedno, profesionalno i jednostavno za korištenje.",

    // Pravila koja određuju boje, sjene i stilove (Visual Law)
    VISUAL_STANDARDS: {
        background: "bg-white (za čiste i pregledne površine)",
        borders: "border-neutral-200 (fino definirani rubovi)",
        shadows: "shadow-card (lagana sjena za dubinu bez buke)",
        motion: "transition-ui (ujednačeno i tečno kretanje)",
        accessibility: "focus-visible:ring-accent-cyan/40 (jasno označavanje gdje se korisnik nalazi)",
        easing: "cubic-bezier(0.16, 1, 0.3, 1) - Apple-style glide",
        scrollMode: "Scroll = Timeline (scroll ne triggera animaciju, on JE animacija)"
    },

    // Stvari koje ne smijemo koristiti (Forbidden Classes)
    RESTRICTED_STYLES: [
        "Neon efekti (zadržati profesionalan ton)",
        "Prevelike sjene (izbjegavati vizualni kaos)",
        "Previše zaobljeni rubovi (rounded-3xl ili više, osim u posebnim slučajevima)",
        "Nekontrolirani blur efekti",
        "Bounce/Spring efekti (NIJE DOZVOLJENO - ostati hladan, precizan i kontroliran)",
        "Letter-by-letter animacije (pokretati cijele blokove teksta)"
    ],

    // Uloga svakog dijela stranice (Page Roles)
    STRUCTURE: {
        HERO: "Sticky sekcija (200-300vh) - filter i fokus na identitet sustava.",
        KERNEL: "Mjesto gdje se pokazuje kako sustav zapravo radi (čisto i tehnički).",
        DOCS: "Službena dokumentacija - jasna, precizna i profesionalna.",
        FOOTER: "Osnovne informacije i potvrda ozbiljnosti projekta."
    },

    // Posebna napomena za animacije (Scroll Engagement)
    ANIMATION_POLICY: "Animacije su direktno vezane za scroll. Koristiti transformacije koje izvršava GPU (translate, scale, opacity)."
};

/**
 * AUDIT-READY SURFACES - STANDARD ZA REVIZIJU
 * Dizajn koji bez srama možete pokazati investitoru ili tehničkom stručnjaku.
 * Čisto, precizno i bez nepotrebnih ukrasa.
 */
export const AuditSurfaceStandard = {
    background: "Pure White (#ffffff)",
    typography: "Mono font za tehničku jasnoću",
    borders: "Minimalistički neutralni tonovi",
    vibe: "Ozbiljnost i povjerenje"
};
