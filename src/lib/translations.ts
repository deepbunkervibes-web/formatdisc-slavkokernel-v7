export type Language = 'hr' | 'en';

export const translations = {
    hr: {
        meta: {
            landingTitle: 'FormatDisc — Audit-pripremni MVP u 48 sati',
            landingDesc: 'FormatDisc isporučuje deterministički softver. Nema "pomaganja", samo isporuka.',
        },
        nav: {
            home: 'Sustav online',
            studio: 'Studio',
            kernel: 'Kernel',
            metrics: 'Metrika',
            audit: 'Revizija',
            docs: 'Dokumentacija',
            investors: 'Investitori',
            bookCall: 'Zakaži konzultacije (Naplativo)',
        },
        hero: {
            titlePrefix: 'Direktna isporuka',
            titleSuffix: 'bez šuma u kanalu',
            subtitle: 'FormatDisc ne "pomaže timovima". FormatDisc zamjenjuje timove. Deterministički, brzo i uz jasnu naplatu.',
            description: 'Izgradnja, testiranje i isporuka audit-pripremnog MVP-a u 48 sati. Arhitektura nije demokracija.',
            badge: 'SlavkoKernel™ v7 Inicijaliziran',
            quote: '"Ne plaćate za vrijeme. Plaćate za desetljeća iskustva komprimiranog u 48 sati."',
            ctaStudio: 'Pokreni Studio',
            ctaKernel: 'Istraži Kernel',
            builder: 'Izradio Mladen Gertner — Arhitekt Sustava',
            pillars: {
                deterministic: { title: 'Deterministički', desc: 'Bez halucinacija.' },
                audit: { title: 'Revizija', desc: 'Spremno za regulatore.' },
                mvp: { title: 'Isporuka', desc: '48 sati. Fiksno.' }
            }
        },
        valueProp: {
            label: 'Protokol',
            title: 'Isporuka MVP-a u 48 sati. Fiksno.',
            description: 'Mali timovi troše tjedne na sastanke. FormatDisc eliminira taj trošak. Vi definirate problem, sustav isporučuje rješenje.',
            cards: {
                idea: {
                    title: 'Specifikacija',
                    desc: 'Donesite problem, a ne "ideju". Preciznost štedi novac.',
                    bullet: 'Bez brainstorming sesija.'
                },
                system: {
                    title: 'Egzekucija',
                    desc: 'FormatDisc generira sustav. Backend, API, dokumentacija.',
                    bullet: 'Automatizirana isporuka.'
                },
                result: {
                    title: 'Transakcija',
                    desc: 'Dobivate kod, API i dokumentaciju. Plaćate za rezultat.',
                    bullet: 'Audibilno i finalno.'
                }
            }
        },
        timeline: {
            title: 'Protokol Isporuke',
            description: 'Od uplate do gotovog proizvoda.'
        },
        archVis: {
            title: 'Arhitektura',
            description: 'Engine koji ne zahtijeva nadzor.',
            module: 'Modul Vizualizacije'
        },
        compliance: {
            title: 'Upravljanje i Naplata',
            description: 'Svaki korak je zabilježen. Svaka inferencija je naplativa.',
            artifacts: 'Artefakti',
            openStudio: 'Otvori Studio',
            items: {
                audit: 'Revizija',
                proof: 'Dokaz Rada',
                assessment: 'Procjena'
            }
        },
        try: {
            title: 'Definirajte Zahtjev',
            subtitle: 'Unesite parametre sustava. Budite precizni. Vrijeme je resurs.',
            placeholder: 'Specifikacija sustava: Ulazni podaci, Očekivani izlaz, Ograničenja...',
            cta: 'Iniciraj Procjenu',
            loading: 'Obrada...',
            feedback: 'Podaci su validirani.',
            hint: 'Napomena: Nejasni zahtjevi se odbacuju.',
            steps: {
                idea: { title: 'Input', desc: 'Ulazni vektori.' },
                audience: { title: 'Tržište', desc: 'Tko plaća?' },
                competition: { title: 'Rizik', desc: 'Analiza prijetnji.' },
                risk: { title: 'Legal', desc: 'Usklađenost.' }
            }
        },
        pricing: {
            title: 'Cjenik Usluga',
            subtitle: 'Jasna vrijednost za jasnu cijenu.',
            cta: 'Kupi',
            rationale: {
                title: '2900 € nije MVP. 2900 € je odluka.',
                description: 'Ova cijena ne pokriva sate rada. Pokriva činjenicu da ne improviziramo. U 48 sati dobivaš sustav koji ima arhitekturu, granice, dokumentaciju i koji se može predati drugom timu.',
                listNot: ['Nije savjetovanje', 'Nije iterativni proces', 'Nije "radimo dok ne budeš zadovoljan"', 'Nije timska suradnja', 'Nije besplatni softver'],
                listIs: ['Deterministička arhitektura', 'Zaključan scope', 'Audit-ready kod', 'Dokumentiran sustav', 'Predaja bez ovisnosti o autoru'],
                cta: 'Ako ovo ima smisla, nastavi.'
            },
            plans: [
                {
                    id: 'free',
                    name: 'Procjena',
                    price: '0 €',
                    description: 'Automatizirana procjena izvedivosti.',
                    highlight: false,
                    features: [
                        { label: '1 simulacija', included: true },
                        { label: 'Osnovni output', included: true },
                        { label: 'Bez konzultacija', included: true },
                        { label: 'PDF ponuda', included: true },
                        { label: 'Analiza', included: true }
                    ]
                },
                {
                    id: 'pro',
                    name: 'MVP Paket',
                    price: '2900 €',
                    description: 'Kompletna izvedba.',
                    highlight: true,
                    features: [
                        { label: 'Neograničene iteracije', included: true },
                        { label: 'Full Stack kod', included: true },
                        { label: 'Deployment', included: true },
                        { label: '30 min primopredaja', included: true }
                    ]
                },
                {
                    id: 'team',
                    name: 'Enterprise',
                    price: 'Custom',
                    description: 'Za korporativne sustave.',
                    highlight: false,
                    features: [
                        { label: 'Sve iz MVP paketa', included: true },
                        { label: 'SLA ugovor', included: true },
                        { label: 'API integracija', included: true },
                        { label: 'R1 Račun', included: true }
                    ]
                }
            ]
        },
        problemSolution: {
            problem: {
                title: 'Problem',
                desc: 'Timovi su spori i skupi. Sastanci ne proizvode kod.'
            },
            solution: {
                title: 'Rješenje',
                desc: 'Deterministička isporuka. Plaćate rezultat, ne sate.'
            }
        },
        founder: {
            title: 'Arhitekt',
            description: 'FormatDisc nije agencija. To je sustav za isporuku softvera visoke vjernosti. Ja nisam vaš "tech co-founder". Ja sam arhitekt kojeg unajmite da se posao obavi kako treba.',
            role: 'Mladen Gertner'
        },
        metrics: {
            velocity: { label: 'Isporuka', value: '48h' },
            audit: { label: 'Preciznost', value: '100%' },
            compliance: { label: 'Standard', value: 'EU AI Act' },
            integrity: { label: 'Arhitektura', value: 'Solid' }
        },
        ctaGrid: {
            label: 'Akcija',
            title: 'Spremni za narudžbu?',
            tiles: {
                studio: { title: 'Pokreni Studio', desc: 'Samostalna konfiguracija.' },
                docs: { title: 'Pročitaj Uvjete', desc: 'Tehnička dokumentacija.' },
                demo: { title: 'Zakaži Poziv', desc: 'Konzultacije se naplaćuju.' }
            },
            cta: 'Dalje'
        },
        footer: {
            slogan: 'Nema besplatnog softvera.',
            rights: 'Sva prava pridržana.',
            privacy: 'Privatnost',
            terms: 'Uvjeti Poslovanja',
            contact: 'Kontakt'
        }
    },
    en: {
        meta: {
            landingTitle: 'FormatDisc — From Idea to MVP in 48 Hours',
            landingDesc: 'FormatDisc helps teams and founders build and ship audit-ready MVPs in record time.',
        },
        nav: {
            home: 'System Online',
            studio: 'Studio',
            kernel: 'Kernel',
            metrics: 'Metrics',
            audit: 'Audit',
            docs: 'Docs',
            investors: 'Investors',
            bookCall: 'Explain to Regulator',
        },
        hero: {
            titlePrefix: 'Faster and clearer path',
            titleSuffix: 'from idea to product',
            subtitle: 'FormatDisc helps teams and founders build and validate functional prototypes in record time — without ambiguity.',
            description: 'Build, test, and ship an audit-ready MVP in 48 hours, with deterministic architecture and full compliance.',
            badge: 'SlavkoKernel™ v7 Initialized',
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
        try: {
            title: 'Input Channel · Founder Disclosure',
            subtitle: 'Enter your idea exactly as you would communicate it to a trusted colleague. No persuasion. No marketing. Only factual intent.',
            placeholder: 'Type here... be specific. The Simulation performs best with detailed inputs.',
            cta: 'Initialize Simulation',
            loading: 'Processing...',
            feedback: 'The result is not personal. The data is.',
            hint: 'Insight: Include what you already know does not work.',
            steps: {
                idea: { title: 'Your Truth', desc: 'What are you building? No pitch.' },
                audience: { title: 'Who Pays?', desc: 'True target audience. Not "everyone".' },
                competition: { title: 'Adversaries', desc: 'Who is taking money while you sleep?' },
                risk: { title: 'Fears', desc: 'What stops you? Legal or technical?' }
            }
        },
        pricing: {
            title: 'Transparent Pricing',
            subtitle: 'Free for your first evaluation. Pay only if it delivers value.',
            cta: 'Select',
            plans: [
                {
                    id: 'free',
                    name: 'Free',
                    price: '0 €',
                    description: 'For your initial assessment.',
                    highlight: false,
                    features: [
                        { label: '1 simulation per day', included: true },
                        { label: 'Basic report', included: true },
                        { label: 'No registration required', included: true },
                        { label: 'PDF export', included: true },
                        { label: 'Risk analysis', included: true }
                    ]
                },
                {
                    id: 'pro',
                    name: 'Pro',
                    price: '29 €',
                    description: 'For committed founders.',
                    highlight: false,
                    features: [
                        { label: 'Unlimited simulations', included: true },
                        { label: 'In‑depth report + recommendations', included: true },
                        { label: 'PDF & Notion export', included: true },
                        { label: 'Priority support', included: true }
                    ]
                },
                {
                    id: 'team',
                    name: 'Team',
                    price: 'Custom',
                    description: 'For accelerators and venture funds.',
                    highlight: false,
                    features: [
                        { label: 'Everything in Pro', included: true },
                        { label: 'Team sharing & comments', included: true },
                        { label: 'API access', included: true },
                        { label: 'Tax‑deductible', included: true }
                    ]
                }
            ]
        },
        problemSolution: {
            problem: {
                title: 'The Problem',
                desc: 'Black‑box AI systems, regulatory misalignment, and uncontrolled hallucinations in production environments.'
            },
            solution: {
                title: 'The Solution',
                desc: 'Deterministic workflows, immutable audit trails, and automated compliance verification for every inference.'
            }
        },
        founder: {
            title: 'The Foundation',
            description: 'FormatDisc was created from a simple insight: the future of AI is not defined solely by intelligence, but by integrity. We build infrastructure that makes AI systems verifiable, reproducible, and safe for enterprise deployment.',
            role: 'Founder & Systems Architect'
        },
        metrics: {
            velocity: { label: 'Implementation Speed', value: '48h' },
            audit: { label: 'Audit Traceability', value: '100%' },
            compliance: { label: 'Compliance', value: 'EU AI Act' },
            integrity: { label: 'System Integrity', value: 'Deterministic' }
        },
        ctaGrid: {
            label: 'Next Steps',
            title: 'Ready for implementation?',
            tiles: {
                studio: { title: 'Launch Studio', desc: 'Begin building your MVP immediately.' },
                docs: { title: 'Read the Docs', desc: 'Understand the protocol and governance layers.' },
                demo: { title: 'Book a Demo', desc: 'For engineering teams and technology leaders.' }
            },
            cta: 'Get Started'
        },
        footer: {
            slogan: 'Deterministic AI governance for the EU AI Act era.',
            rights: 'All rights reserved.',
            privacy: 'Privacy',
            terms: 'Terms',
            contact: 'Contact'
        }
    }
};
