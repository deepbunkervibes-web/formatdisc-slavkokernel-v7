export type Language = 'hr' | 'en';

export const translations = {
    hr: {
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
        footer: {
            slogan: 'Arhitektura za sljedeću generaciju osnivača.',
            rights: 'Sva prava pridržana.',
            privacy: 'Privatnost',
            terms: 'Uvjeti',
            contact: 'Kontakt'
        }
    },
    en: {
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
        footer: {
            slogan: 'Architecture for the next generation of founders.',
            rights: 'All rights reserved.',
            privacy: 'Privacy',
            terms: 'Terms',
            contact: 'Contact'
        }
    }
};
