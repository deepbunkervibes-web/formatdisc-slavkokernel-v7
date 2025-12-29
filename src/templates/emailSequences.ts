export const EMAIL_TEMPLATES = {
    WELCOME: {
        HR: {
            subject: "Dobrodošli u FormatDisc – Istina o vašoj ideji",
            body: `Bok {{name}},

Nećemo vas motivirati. Nećemo vam reći "samo naprijed".
Ovdje smo da provjerimo ima li vaša ideja tržišnog smisla prije nego što potrošite 6 mjeseci na kodiranje.

Naš AI simulira investicijski odbor. Bit će strog. Bit će iskren.
I to je najbolje što možemo učiniti za vas.

Sretno,
FormatDisc Tim`
        },
        EN: {
            subject: "Welcome to FormatDisc – The Truth About Your Idea",
            body: `Hi {{name}},

We won't motivate you. We won't say "just do it".
We are here to check if your idea makes market sense before you spend 6 months coding.

Our AI simulates an investment committee. It will be strict. It will be honest.
And that is the best thing we can do for you.

Good luck,
FormatDisc Team`
        }
    },
    VERDICT_PROCEED: {
        HR: {
            subject: "Verdikt: PROCEED – Vaša ideja ima strukturu",
            body: `Bok {{name}},

Simulacija je gotova. Verdikt je: PROCEED.

To ne znači da ćete sigurno uspjeti. To znači da ideja strukturno drži vodu.
Tržište postoji, logika je čvrsta, a rizici su upravljivi.

Sljedeći korak: Izgradite MVP. Imamo blueprint spreman za vas.

Samo naprijed,
FormatDisc Tim`
        },
        EN: {
            subject: "Verdict: PROCEED – Your Idea Has Structure",
            body: `Hi {{name}},

Simulation complete. Verdict: PROCEED.

This doesn't mean guaranteed success. It means the idea holds water structurally.
The market exists, the logic is sound, and risks are manageable.

Next step: Build the MVP. We have the blueprint ready for you.

Go ahead,
FormatDisc Team`
        }
    },
    VERDICT_REVISE: {
        HR: {
            subject: "Verdikt: REVISE – Dobar smjer, ali...",
            body: `Bok {{name}},

Simulacija je gotova. Verdikt je: REVISE.

Srž ideje je dobra. Ali izvršni plan ili tajming imaju rupe.
Ne gradite još. Prvo zakrpajte te rupe.
U izvještaju smo označili točno što trebate popraviti.

Popravite pa probajte opet,
FormatDisc Tim`
        },
        EN: {
            subject: "Verdict: REVISE – Good Direction, But...",
            body: `Hi {{name}},

Simulation complete. Verdict: REVISE.

The core idea is good. But the execution plan or timing has holes.
Do not build yet. Patch those holes first.
We've flagged exactly what needs fixing in your report.

Fix and retry,
FormatDisc Team`
        }
    },
    VERDICT_REJECT: {
        HR: {
            subject: "Verdikt: REJECT – Uštedjeli smo vam mjesece života",
            body: `Bok {{name}},

Simulacija je gotova. Verdikt je: REJECT.

Ovo nije poraz. Ovo je pobjeda vremena.
Upravo smo vam uštedjeli 6-12 mjeseci rada na nečemu što tržište vjerojatno ne bi prihvatilo u ovom obliku.
Pročitajte "Post-Mortem" u izvještaju. Naučite. Onda smislite nešto novo.

Bolje doznati danas nego za godinu dana,
FormatDisc Tim`
        },
        EN: {
            subject: "Verdict: REJECT – We Just Saved You Months",
            body: `Hi {{name}},

Simulation complete. Verdict: REJECT.

This isn't failure. This is a victory of time.
We just saved you 6-12 months of working on something the market likely wouldn't accept in this form.
Read the "Post-Mortem" in the report. Learn. Then invent something new.

Better to know today than in a year,
FormatDisc Team`
        }
    },
    PRICING_NUDGE: {
        HR: {
            subject: "Ideja prolazi. Sad je vrijeme za dublju analizu.",
            body: `Bok {{name}},

Tvoj izvještaj je dobar. Ali investitori traže više.

Uz Pro plan dobiješ:
- Analizu rizika u stvarnom vremenu
- Izvještaj spreman za prezentaciju (PDF One-Pager)
- Plaćaš samo ako ti se isplati

Uzmi Pro — prije nego potrošiš na pogrešno.

Link: {{checkout_url}}`
        },
        EN: {
            subject: "Your idea passes. Now prove it to investors.",
            body: `Hi {{name}},

Your report is solid. But investors want deeper validation.

With Pro:
- Live risk analysis
- Investor-ready PDF export (One-Pager)
- Pay only if your idea clears

Get Pro — before you build the wrong thing.

Link: {{checkout_url}}`
        }
    }
};
