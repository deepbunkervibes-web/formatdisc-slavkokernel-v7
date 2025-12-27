export type Language = 'hr' | 'en';

export const translations = {
    hr: {
        meta: {
            landingTitle: 'FormatDisc — Od ideje do MVP-a u 48 sata',
            landingDesc: 'FormatDisc pomaže timovima i osnivačima da u kratkom roku izgrade i isporuče audit-pripremni MVP.',
        },
        nav: {
            home: 'Početna',
            studio: 'Studio',
            kernel: 'Kernel',
            metrics: 'Metrika',
            audit: 'Revizija',
            docs: 'Dokumentacija',
            investors: 'Investitori',
            bookCall: 'Rezerviraj Poziv',
        },
        hero: {
            titlePrefix: 'Brži i jasniji put',
            titleSuffix: 'od ideje do proizvoda',
            subtitle: 'FormatDisc pomaže timovima i osnivačima da u kratkom roku izgrade i validiraju funkcionalne prototipove — bez nejasnoća.',
            description: 'Izgradite, testirajte i isporučite audit-pripremni MVP u 48 sati, uz determinističku arhitekturu i potpunu usklađenost.',
            badge: 'SlavkoKernel™ v7 na Ollami',
            quote: '"FormatDisc radi ono što bi inače radio tim od pet ljudi — u 48 sati."',
            ctaStudio: 'Pokreni MVP Studio',
            ctaKernel: 'Istraži Kernel',
            builder: 'Izradio Mladen Gertner — Arhitekt Sustava',
            pillars: {
                deterministic: { title: 'Deterministički', desc: 'Bez halucinacija, bez nagađanja.' },
                audit: { title: 'Spreman za Reviziju', desc: 'Usklađen s EU AI Act-om.' },
                mvp: { title: '48-Satni MVP', desc: 'Od koncepta do produkcije.' }
            }
        },
        valueProp: {
            label: 'Proces',
            title: 'Od ideje do funkcionalnog MVP-a u 48 sati',
            description: 'Ono što obično malom timu treba tjednima, FormatDisc isporučuje u dva dana – strukturirano, dokumentirano i spremno za isporuku.',
            cards: {
                idea: {
                    title: 'Ideja',
                    desc: 'Počinjete s jednostavnim konceptom – npr. "Želim aplikaciju koja šalje automatske podsjetnike korisnicima."',
                    bullet: 'Bez specifikacija, bez arhitekture, bez tehničkih odluka.'
                },
                system: {
                    title: 'Sustav',
                    desc: 'FormatDisc dizajnira cijeli sustav – backend, API, model podataka, UI izgled i dokumentaciju.',
                    bullet: 'Sve generirano kao koherentan paket spreman za produkciju.'
                },
                result: {
                    title: 'Rezultat',
                    desc: 'Dobivate live preview, čist kod, API endpointove i dokumentaciju spremnu za investitore – sve u 48 sati.',
                    bullet: 'Spremno za isporuku, provjerljivo i usklađeno.'
                }
            }
        },
        timeline: {
            title: 'Razvojni Put',
            description: 'Od početnog dizajna protokola do AI upravljanja na razini poduzeća.'
        },
        archVis: {
            title: 'Arhitektura Sustava',
            description: 'Deterministički engine koji pokreće provjerljivu umjetnu inteligenciju.',
            module: 'Modul Vizualizacije / Offline'
        },
        compliance: {
            title: 'Doživite Upravljanje',
            description: 'Pogledajte kako FormatDisc pretvara bilo koju ideju u proces spreman za regulatore.',
            artifacts: 'Compliance Artefakti',
            openStudio: 'Otvori Puni Studio',
            items: {
                audit: 'Nepromjenjiva Revizija',
                proof: 'Deterministički Dokaz',
                assessment: 'EU AI Act Procjena'
            }
        },
        tryItNow: {
            title: 'Isprobajte odmah – bez trenja',
            description: 'Zamislite to kao GitHub Copilot — ali za cijeli proizvod, ne samo za kod. Unesite ideju da biste odmah vidjeli arhitekturu koju FormatDisc dizajnira.',
            placeholder: 'Opišite svoju ideju proizvoda u jednoj rečenici...',
            cta: 'Generiraj Pregled',
            loading: 'Generiranje...',
        },
        problemSolution: {
            problem: {
                title: 'Problem',
                desc: 'Black-box AI, regulatorna neusklađenost i nekontrolirane halucinacije u produkcijskim okruženjima.'
            },
            solution: {
                title: 'Rješenje',
                desc: 'Deterministički tijekovi rada, nepromjenjivi tragovi revizije i automatizirana provjera usklađenosti za svaku inferenciju.'
            }
        },
        founder: {
            title: 'Temelj',
            description: 'FormatDisc je rođen iz jednostavne spoznaje: budućnost AI-a nije samo u inteligenciji, već u integritetu. Gradimo infrastrukturu koja AI sustave čini provjerljivima, ponovljivima i sigurnima za korporativnu primjenu.',
            role: 'Osnivač i Arhitekt Sustava'
        },
        metrics: {
            velocity: { label: 'Brzina Implementacije', value: '48h' },
            audit: { label: 'Slijedivost Revizije', value: '100%' },
            compliance: { label: 'Usklađenost', value: 'EU AI Act' },
            integrity: { label: 'Integritet Sustava', value: 'Deterministički' }
        },
        ctaGrid: {
            label: 'Sljedeći Koraci',
            title: 'Spremni za implementaciju?',
            tiles: {
                studio: { title: 'Pokreni Studio', desc: 'Započnite izgradnju svog MVP-a odmah.' },
                docs: { title: 'Pročitaj Dokumentaciju', desc: 'Razumijete protokol i slojeve upravljanja.' },
                demo: { title: 'Rezerviraj Demo', desc: 'Za inženjerske timove i direktore tehnologije.' }
            },
            cta: 'Započni'
        },
        footer: {
            slogan: 'Arhitektura za sljedeću generaciju osnivača.',
            rights: 'Sva prava pridržana.',
            privacy: 'Privatnost',
            terms: 'Uvjeti',
            contact: 'Kontakt'
        }
    },
    en: {
        meta: {
            landingTitle: 'FormatDisc — From Idea to MVP in 48 Hours',
            landingDesc: 'FormatDisc helps teams and founders build and ship audit-ready MVPs in record time.',
        },
        nav: {
            home: 'Home',
            studio: 'Studio',
            kernel: 'Kernel',
            metrics: 'Metrics',
            audit: 'Audit',
            docs: 'Docs',
            investors: 'Investors',
            bookCall: 'Book a Call',
        },
        hero: {
            titlePrefix: 'Faster and clearer path',
            titleSuffix: 'from idea to product',
            subtitle: 'FormatDisc helps teams and founders build and validate functional prototypes in record time — without ambiguity.',
            description: 'Build, test, and ship an audit-ready MVP in 48 hours, with deterministic architecture and full compliance.',
            badge: 'SlavkoKernel™ v7 on Ollama',
            quote: '"FormatDisc does what a team of five would normally do — in 48 hours."',
            ctaStudio: 'Launch MVP Studio',
            ctaKernel: 'Explore Kernel',
            builder: 'Built by Mladen Gertner — System Architect',
            pillars: {
                deterministic: { title: 'Deterministic', desc: 'No hallucinations, no guesswork.' },
                audit: { title: 'Audit-Ready', desc: 'EU AI Act aligned outputs.' },
                mvp: { title: '48-Hour MVP', desc: 'From concept to production.' }
            }
        },
        valueProp: {
            label: 'The Process',
            title: 'From idea to working MVP in 48 hours',
            description: 'What usually takes a small team weeks, FormatDisc delivers in two days – structured, documented, and ready to ship.',
            cards: {
                idea: {
                    title: 'The Idea',
                    desc: 'You start with a simple concept – e.g., "I want an app that sends automatic reminders to users."',
                    bullet: 'No specs, no architecture, no tech decisions.'
                },
                system: {
                    title: 'The System',
                    desc: 'FormatDisc designs the full system – backend, API, data model, UI layout, and documentation.',
                    bullet: 'All generated as a coherent, production‑ready package.'
                },
                result: {
                    title: 'The Result',
                    desc: 'You receive a live preview, clean code, API endpoints and investor‑ready docs – all in 48 hours.',
                    bullet: 'Ready to ship, auditable and compliant.'
                }
            }
        },
        timeline: {
            title: 'Development Timeline',
            description: 'From initial protocol design to enterprise-grade AI governance.'
        },
        archVis: {
            title: 'System Architecture',
            description: 'The deterministic engine powering auditable AI.',
            module: 'Visualization Module / Offline'
        },
        compliance: {
            title: 'Experience Governance',
            description: 'See how FormatDisc transforms any idea into a regulator-ready process.',
            artifacts: 'Compliance Artifacts',
            openStudio: 'Open Full Studio',
            items: {
                audit: 'Immutable Audit Trail',
                proof: 'Deterministic Proof',
                assessment: 'EU AI Act Assessment'
            }
        },
        tryItNow: {
            title: 'Try it now – zero friction',
            description: 'Think of it as GitHub Copilot — but for the entire product, not just code. Enter an idea to see the architecture FormatDisc designs instantly.',
            placeholder: 'Describe your product idea in one sentence...',
            cta: 'Generate Preview',
            loading: 'Generating...',
        },
        problemSolution: {
            problem: {
                title: 'The Problem',
                desc: 'Black-box AI, regulatory non-compliance, and uncontrollable hallucinations in production environments.'
            },
            solution: {
                title: 'The Solution',
                desc: 'Deterministic workflows, immutable audit trails, and automated compliance verification for every inference.'
            }
        },
        founder: {
            title: 'The Foundation',
            description: 'FormatDisc was born from a simple realization: the future of AI isn\'t just about intelligence, it\'s about integrity. We build the infrastructure that makes AI systems auditable, reproducible, and safe for enterprise deployment.',
            role: 'Founder & System Architect'
        },
        metrics: {
            velocity: { label: 'Deployment Velocity', value: '48h' },
            audit: { label: 'Audit Traceability', value: '100%' },
            compliance: { label: 'Compliance Mapping', value: 'EU AI Act' },
            integrity: { label: 'System Integrity', value: 'Deterministic' }
        },
        ctaGrid: {
            label: 'Next Steps',
            title: 'Ready to Deploy?',
            tiles: {
                studio: { title: 'Launch Studio', desc: 'Start building your deterministic MVP now.' },
                docs: { title: 'Read the Docs', desc: 'Understand the protocol and governance layers.' },
                demo: { title: 'Book a Demo', desc: 'For enterprise engineering teams and CTOs.' }
            },
            cta: 'Get Started'
        },
        footer: {
            slogan: 'Architecture for the next generation of founders.',
            rights: 'All rights reserved.',
            privacy: 'Privacy',
            terms: 'Terms',
            contact: 'Contact'
        }
    }
};
