"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  ChevronRight,
  Crown,
  Globe2,
  Mail,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

type Lang = "it" | "en";

type Cat = "concerti" | "strutture" | "engineering" | "backstage";

type Work = {
  src: string;
  label: string;
  /* Attribuzione reale del progetto: "Nome progetto · Città · Anno · Cliente".
     Vuoto = nessuna didascalia mostrata. NON riempire con segnaposto: se la
     stringa e' vuota il sito semplicemente non scrive nulla. */
  detail: string;
  alt: string;
  cat: Cat;
  o: "pano" | "land" | "port"; // forma: panoramica (≥2:1) / orizzontale / verticale
};

/* Hero: un appendimento riconoscibile, non il pubblico — truss sospese su
   motori e catene. Scelta secondo il brief di A. Rocco (target B2B). */
const HERO = "/portfolio_gallery/str-11.jpeg";

/* Prenotazione call: incollare qui l'URL pubblico di Cal.com o Calendly.
   Finche' e' vuota, "Prenota una call" ripiega su una email precompilata
   (vedi bookingHref). Usare un link diretto e non un embed: cosi' non si
   caricano script di terzi sul dominio e non serve il banner cookie. */
const BOOKING_URL = "";

/* ------------------------------------------------------------------
   CONTATTI — punto unico di modifica.

   ⚠️  PROVVISORI: sono i recapiti personali di Giorgio Sala.
   Vanno sostituiti con quelli ufficiali della societa' appena esistono
   (casella aziendale dopo la costituzione). Cambiare qui e basta:
   nel resto della pagina non c'e' nessun indirizzo scritto a mano.
   ------------------------------------------------------------------ */
const CONTACT_EMAIL = "sala.giorgio24@gmail.com";
const CONTACT_PHONE = "+39 339 896 8874";
const CONTACT_WHATSAPP = "393398968874";

/* Il bottone "Prenota una call" punta a Cal.com/Calendly se BOOKING_URL e'
   valorizzato, altrimenti apre una email gia' impostata con le domande che
   servono a qualificare la richiesta. */
function bookingHref(subject: string, body: string): string {
  if (BOOKING_URL) return BOOKING_URL;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const copy = {
  it: {
    nav: ["Progetti", "Servizi", "Contatti"],
    eyebrow: "Rigging · Motion · Automazione per il live",
    titleTop: "L'evoluzione",
    titleBottom: "del rigging.",
    claim:
      "Advanced rigging and motion solutions for concerts, festivals, theatres and large-scale productions.",
    heroLine:
      "Progettiamo, calcoliamo e dirigiamo le strutture sospese degli spettacoli dal vivo.",
    primary: "Parla con un tecnico",
    secondary: "I progetti",

    problemTag: "Il problema",
    problemTitle: "Il rilievo dei punti di ancoraggio si fa ancora a mano.",
    problemText:
      "Ogni venue ha ancoraggi, portate e geometrie diverse. Prima di ogni produzione i punti si misurano manualmente, in quota, e il rilievo si ripete a ogni allestimento. È il passaggio più lento della catena: ogni ora persa in load-in è un costo che resta sulla produzione.",
    solutionTag: "La direzione",
    solutionTitle: "Rilievo automatizzato, parametri in tempo reale.",
    solutionText:
      "Stiamo sviluppando un sistema che rileva i punti di ancoraggio con un drone e restituisce mappa e parametri di carico durante il sopralluogo, non giorni dopo. Il lavoro è in corso dentro un progetto di ricerca europeo.",
    solutionNote: "Tecnologia in sviluppo — non ancora un prodotto a catalogo.",

    servicesTag: "Servizi",
    servicesLine:
      "Il nostro prodotto è il progetto: calcoli, documentazione e direzione tecnica. Il montaggio è eseguito da squadre contrattualizzate separatamente, sotto il nostro coordinamento.",
    services: [
      [
        "Progettazione e ingegneria",
        "Rigging plot, calcolo e verifica dei carichi, relazione tecnica, layout CAD per palchi, arene, teatri e strutture temporanee.",
      ],
      [
        "Sicurezza e compliance",
        "Load analysis, controlli pre-installazione, documentazione tecnica di cantiere e conformità alle norme sui lavori in quota.",
      ],
      [
        "Direzione tecnica",
        "Regia tecnica di load-in, spettacolo e strike: sequenze, conformità e controllo qualità nei tempi serrati delle tournée.",
      ],
      [
        "Allestimenti custom",
        "Elementi sospesi scenografici, sistemi di discesa controllata, strutture non standard per brand, festival e broadcast.",
      ],
      [
        "Motion control",
        "Integrazione di sistemi per elementi sospesi in movimento, con controllo di posizione e sincronizzazione con lo spettacolo.",
      ],
    ],

    galleryTag: "Progetti",
    galleryHint: "foto",
    filters: {
      tutti: "Tutti",
      concerti: "Concerti",
      strutture: "Strutture",
      engineering: "Engineering",
      backstage: "Backstage",
    },

    contactEyebrow: "Contatti",
    contactTitle: "Parliamo del tuo progetto.",
    contactLine:
      "Sopralluoghi, calcoli, fattibilità di un appendimento: scrivici o chiamaci.",
    contactBtn: "Parla con un tecnico",
    teamTag: "I quattro co-founder",
    footer: "Rigging, motion e automazione per il live.",
    quoteTitle: "Contatti",
    quoteText: "Come preferisci contattarci?",
    bookBtn: "Prenota una call",
    bookSubject: "24 Rigging — Richiesta di una call",
    bookBody:
      "Buongiorno,\nvorrei fissare una call con un tecnico di 24 Rigging.\n\nEvento o progetto:\nVenue e citta':\nDate previste:\nCosa c'e' da appendere:\nNome e telefono:\n\nGrazie.",
    close: "Chiudi",
    menu: "Menu",
  },
  en: {
    nav: ["Projects", "Services", "Contact"],
    eyebrow: "Rigging · Motion · Automation for live",
    titleTop: "The evolution",
    titleBottom: "of rigging.",
    claim:
      "Advanced rigging and motion solutions for concerts, festivals, theatres and large-scale productions.",
    heroLine:
      "We engineer, calculate and direct the suspended structures behind live shows.",
    primary: "Talk to an expert",
    secondary: "The projects",

    problemTag: "The problem",
    problemTitle: "Anchor point surveys are still done by hand.",
    problemText:
      "Every venue has different anchor points, load capacities and geometries. Before each production the points are measured manually, at height, and the survey is repeated for every build. It is the slowest step in the chain: every hour lost during load-in stays on the production's bill.",
    solutionTag: "Where we are going",
    solutionTitle: "Automated survey, load figures in real time.",
    solutionText:
      "We are developing a system that surveys anchor points with a drone and returns the map and the load figures during the site visit, not days later. The work is under way inside a European research project.",
    solutionNote: "Technology under development — not yet a catalogue product.",

    servicesTag: "Services",
    servicesLine:
      "Our product is the design: calculations, documentation and technical direction. The physical build is carried out by separately contracted crews under our coordination.",
    services: [
      [
        "Design and engineering",
        "Rigging plots, load calculation and verification, technical reports and CAD layouts for stages, arenas, theatres and temporary structures.",
      ],
      [
        "Safety and compliance",
        "Load analysis, pre-installation checks, on-site technical documentation and compliance with work-at-height regulations.",
      ],
      [
        "Technical direction",
        "Technical direction of load-in, show and strike: sequencing, compliance and quality control within tight touring schedules.",
      ],
      [
        "Custom builds",
        "Suspended scenic elements, slow-descent systems and non-standard structures for brands, festivals and broadcast.",
      ],
      [
        "Motion control",
        "Integration of systems for moving suspended elements, with position control and synchronisation to the show.",
      ],
    ],

    galleryTag: "Projects",
    galleryHint: "photos",
    filters: {
      tutti: "All",
      concerti: "Concerts",
      strutture: "Structures",
      engineering: "Engineering",
      backstage: "Backstage",
    },

    contactEyebrow: "Contact",
    contactTitle: "Let's talk about your project.",
    contactLine:
      "Site surveys, calculations, feasibility of a rig: write or call us.",
    contactBtn: "Talk to an expert",
    teamTag: "The four co-founders",
    footer: "Rigging, motion and automation for live.",
    quoteTitle: "Contact",
    quoteText: "How would you like to reach us?",
    bookBtn: "Book a call",
    bookSubject: "24 Rigging — Call request",
    bookBody:
      "Hello,\nI would like to book a call with a 24 Rigging engineer.\n\nEvent or project:\nVenue and city:\nDates:\nWhat needs to be rigged:\nName and phone:\n\nThank you.",
    close: "Close",
    menu: "Menu",
  },
} as const;

/* Solo foto in alta qualità, curate e categorizzate.
   `detail` va compilato con l'attribuzione reale (progetto · città · anno · cliente)
   quando i soci la forniscono: finche' e' vuoto non viene mostrato nulla. */
const works: Work[] = [
  // ---- Concerti / show ----
  { src: "/portfolio_gallery/con-1.jpeg", label: "Crowd", detail: "", alt: "Stadio gremito davanti al palco con rig completo.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-3.jpeg", label: "Live", detail: "", alt: "Show con scenografia illuminata e fasci di luce.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-5.jpeg", label: "Show design", detail: "", alt: "Scenografia di concerto con luci e strutture verticali.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-6.jpeg", label: "Live", detail: "", alt: "Maxischermo e pubblico durante lo show.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-7.jpeg", label: "Live", detail: "", alt: "Palco panoramico con impianto luci durante il concerto.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-8.jpeg", label: "Live", detail: "", alt: "Show all'aperto con maxischermo e struttura scenica.", cat: "concerti", o: "land" },
  // ---- Strutture / truss ----
  { src: "/portfolio_gallery/str-1.jpeg", label: "Structure", detail: "", alt: "Cupola strutturale vista dal basso, geometria circolare di truss.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-2.jpeg", label: "Structure", detail: "", alt: "Facciata geometrica di travi reticolari controluce.", cat: "strutture", o: "port" },
  { src: "/portfolio_gallery/str-3.jpeg", label: "Rigging", detail: "", alt: "Grande elemento scenografico sospeso sopra il palco, con griglia di rigging e maxischermi.", cat: "strutture", o: "port" },
  { src: "/portfolio_gallery/str-4.jpeg", label: "Stadio", detail: "", alt: "Allestimento del palco di un concerto in uno stadio, vista dall'alto.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-5.jpeg", label: "Stadio", detail: "", alt: "Palco e struttura di un concerto in uno stadio, panoramica.", cat: "strutture", o: "pano" },
  { src: "/portfolio_gallery/str-6.jpeg", label: "Truss grid", detail: "", alt: "Griglia di truss backstage con segnaletica di sicurezza.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-7.jpeg", label: "Venue", detail: "", alt: "Interno di venue con struttura di rigging completa.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-8.jpeg", label: "Build", detail: "", alt: "Allestimento strutturale con postazioni tecniche.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-9.jpeg", label: "Truss", detail: "", alt: "Struttura di truss con tecnici al lavoro in quota.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-10.jpeg", label: "Stadio", detail: "", alt: "Stadio visto dall'alto durante l'allestimento del concerto, con tecnico in primo piano.", cat: "strutture", o: "pano" },
  // ---- Engineering (disegni tecnici, plot di carico) ----
  { src: "/portfolio_gallery/portfolio-24.jpeg", label: "Engineering", detail: "", alt: "Disegno tecnico CAD di un truss automatizzato con quote e sezioni.", cat: "engineering", o: "land" },
  { src: "/portfolio_gallery/portfolio-25.jpeg", label: "Engineering", detail: "", alt: "Plot di carico del rigging: distribuzione dei pesi sui motori.", cat: "engineering", o: "land" },
  { src: "/portfolio_gallery/eng-3.jpeg", label: "Engineering", detail: "", alt: "Layout CAD di progetto con pianta e griglia dei carichi.", cat: "engineering", o: "port" },
  // ---- Backstage / crew / high access ----
  { src: "/portfolio_gallery/bks-2.jpeg", label: "Build", detail: "", alt: "Tecnico al lavoro su una struttura con vista sullo stadio.", cat: "backstage", o: "land" },
  { src: "/portfolio_gallery/bks-1.jpeg", label: "High access", detail: "", alt: "Rigger in quota in controluce al tramonto su una struttura.", cat: "backstage", o: "port" },
  { src: "/portfolio_gallery/bks-3.jpeg", label: "High access", detail: "", alt: "Tecnico che sale in quota su una torre di rigging.", cat: "backstage", o: "port" },
  { src: "/portfolio_gallery/bks-6.jpeg", label: "Build", detail: "", alt: "Allestimento del palco con crew e attrezzature.", cat: "backstage", o: "pano" },
  { src: "/portfolio_gallery/bks-5.jpeg", label: "Crew", detail: "", alt: "Operatore alla gru durante il montaggio della struttura.", cat: "backstage", o: "port" },
];

const CATS: ("tutti" | Cat)[] = ["tutti", "concerti", "strutture", "engineering", "backstage"];

/* Foto piccole nella sezione contatti, una riga di presentazione a testa. */
const team = [
  { name: "Giorgio Sala", src: "/portfolio_gallery/team-sala.jpeg", roleIt: "Progettazione & rigging", roleEn: "Design & rigging" },
  { name: "Antonella Serra", src: "/portfolio_gallery/team-serra.jpeg", roleIt: "Architettura & planimetrie", roleEn: "Architecture & layouts" },
  { name: "Matteo D'Angelo", src: "/portfolio_gallery/team-dangelo.jpeg", roleIt: "Operazioni in quota", roleEn: "Work at height" },
  { name: "Alessandra Rocco", src: "/portfolio_gallery/team-rocco.jpeg", roleIt: "Produzione & vendite", roleEn: "Production & sales" },
] as const;

/* Ordina la lista per forma: le panoramiche (≥2:1) restano singole a tutta larghezza,
   le orizzontali e le verticali si affiancano in coppia con i propri simili (niente crop strani). */
function arrange(list: Work[]): Work[] {
  const pano = list.filter((w) => w.o === "pano").map((w) => [w]);
  const lands = list.filter((w) => w.o === "land");
  const ports = list.filter((w) => w.o === "port");
  const chunk = (a: Work[]) => {
    const r: Work[][] = [];
    for (let i = 0; i < a.length; i += 2) r.push(a.slice(i, i + 2));
    return r;
  };
  const lp = chunk(lands);
  const pp = chunk(ports);
  const units: Work[][] = [];
  let li = 0,
    ni = 0,
    pi = 0;
  while (li < lp.length || ni < pano.length || pi < pp.length) {
    if (li < lp.length) units.push(lp[li++]);
    if (ni < pano.length) units.push(pano[ni++]);
    if (pi < pp.length) units.push(pp[pi++]);
  }
  return units.flat();
}

export default function StageSite() {
  const [lang, setLang] = useState<Lang>("it");
  const [selected, setSelected] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cat, setCat] = useState<"tutti" | Cat>("tutti");
  const t = copy[lang];

  // lista filtrata per categoria e riordinata per il layout
  const list = useMemo(
    () => arrange(cat === "tutti" ? works : works.filter((w) => w.cat === cat)),
    [cat],
  );

  useEffect(() => {
    document.body.style.overflow = selected !== null || quoteOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, quoteOpen]);

  const close = useCallback(() => setSelected(null), []);
  const next = useCallback(() => setSelected((i) => (i === null ? i : (i + 1) % list.length)), [list.length]);
  const prev = useCallback(() => setSelected((i) => (i === null ? i : (i - 1 + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close, next, prev]);

  const work = selected === null ? null : list[selected];

  // card-stream aspect-aware: ogni foto nella sua forma → niente crop strani.
  const blocks: { kind: "pano" | "big" | "pairL" | "pairP" | "solo"; idx: number[] }[] = [];
  {
    let i = 0;
    while (i < list.length) {
      const a = list[i];
      if (a.o === "pano") {
        blocks.push({ kind: "pano", idx: [i] });
        i += 1;
      } else if (a.o === "port") {
        if (i + 1 < list.length && list[i + 1].o === "port") {
          blocks.push({ kind: "pairP", idx: [i, i + 1] });
          i += 2;
        } else {
          blocks.push({ kind: "solo", idx: [i] });
          i += 1;
        }
      } else {
        if (i + 1 < list.length && list[i + 1].o === "land") {
          blocks.push({ kind: "pairL", idx: [i, i + 1] });
          i += 2;
        } else {
          blocks.push({ kind: "big", idx: [i] });
          i += 1;
        }
      }
    }
  }

  const navLinks = [
    { href: "#progetti", label: t.nav[0] },
    { href: "#servizi", label: t.nav[1] },
    { href: "#contatti", label: t.nav[2] },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070b] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,106,0.16),_transparent_32%),radial-gradient(circle_at_80%_10%,_rgba(59,130,246,0.12),_transparent_22%),linear-gradient(180deg,_#07090e_0%,_#05070b_40%,_#040507_100%)]" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto max-w-[1680px] px-4 pb-20 pt-5 md:px-8 lg:px-10">
        {/* Header */}
        <header className="relative flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-md md:rounded-full">
          <div className="relative h-12 w-[168px] md:h-14 md:w-[198px]">
            <Image src="/twentyfour-logo-clean.png" alt="24 Rigging" fill priority sizes="198px" className="object-contain object-left" />
          </div>
          <nav className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.24em] text-[#bcc2d1] md:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-white/10 bg-black/20 p-1 text-[11px] uppercase tracking-[0.22em]">
              {(["it", "en"] as Lang[]).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} className={`rounded-full px-3 py-1.5 transition-colors ${lang === l ? "bg-white text-[#05070b]" : "text-[#b7bfd0]"}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label={t.menu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/85 transition-colors hover:border-white/30 md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Menu mobile */}
          {menuOpen ? (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[24px] border border-white/12 bg-[#0a0d13]/95 backdrop-blur-xl md:hidden">
              <nav className="flex flex-col p-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3.5 text-[12px] uppercase tracking-[0.24em] text-[#cfd5e2] transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ) : null}
        </header>

        {/* Hero */}
        <section className="relative mt-6 overflow-hidden rounded-[40px] border border-white/10">
          <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1.02 }} transition={{ duration: 16, ease: "easeOut" }} className="absolute inset-0">
            <Image src={HERO} alt="Travi di truss sospese su motori e catene durante il montaggio." fill priority sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.10)_0%,rgba(4,6,10,0.22)_45%,rgba(4,6,10,0.72)_78%,rgba(4,6,10,0.92)_100%)]" />
          <div className="relative flex min-h-[82vh] flex-col justify-end p-7 md:p-14">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b46a]/40 bg-black/55 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#f0d8a3] backdrop-blur-md">
                <Crown className="h-3.5 w-3.5" />
                {t.eyebrow}
              </div>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
                {t.titleTop}
                <span className="block text-[#d8b46a]">{t.titleBottom}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg md:leading-8">{t.claim}</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">{t.heroLine}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => setQuoteOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b46a] px-6 py-3.5 text-sm font-semibold text-[#0d0f14] transition-transform duration-300 hover:-translate-y-0.5">
                  {t.primary} <ArrowUpRight className="h-4 w-4" />
                </button>
                <Link href="#progetti" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/30">
                  {t.secondary} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problema → soluzione */}
        <section className="py-16 md:py-20">
          <div className="grid gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm md:p-10"
            >
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#8d94a5]">{t.problemTag}</div>
              <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">{t.problemTitle}</h2>
              <p className="mt-5 text-sm leading-7 text-[#abb3c7] md:text-base md:leading-8">{t.problemText}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[30px] border border-[#d8b46a]/25 bg-[linear-gradient(135deg,rgba(216,180,106,0.14),rgba(255,255,255,0.03))] p-7 md:p-10"
            >
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#ead8b0]">{t.solutionTag}</div>
              <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">{t.solutionTitle}</h2>
              <p className="mt-5 text-sm leading-7 text-white/80 md:text-base md:leading-8">{t.solutionText}</p>
              <p className="mt-6 inline-flex rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/65">
                {t.solutionNote}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Servizi */}
        <section id="servizi" className="py-10 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.servicesTag}</h2>
            <p className="max-w-xl text-sm leading-7 text-[#abb3c7]">{t.servicesLine}</p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.services.map(([title, text], si) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: si * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-7"
              >
                <div className="text-lg font-semibold text-[#d8b46a]">{title}</div>
                <p className="mt-3 text-sm leading-7 text-[#abb3c7]">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Progetti */}
        <section id="progetti" className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.galleryTag}</h2>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#bcc2d1]">
              {list.length} {t.galleryHint}
            </div>
          </div>
          {/* Filtri per categoria */}
          <div className="mt-7 flex flex-wrap gap-2">
            {CATS.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setCat(c);
                  }}
                  className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                    active
                      ? "border-[#d8b46a] bg-[#d8b46a] text-[#0d0f14]"
                      : "border-white/12 bg-white/[0.03] text-[#bcc2d1] hover:border-white/30 hover:text-white"
                  }`}
                >
                  {t.filters[c]}
                </button>
              );
            })}
          </div>
          <div className="mt-8 space-y-6 md:space-y-8">
            {blocks.map((b, bi) => {
              const grid = b.kind === "pairL" || b.kind === "pairP";
              const aspect = b.kind === "pano" ? "aspect-[2/1]" : b.kind === "big" ? "aspect-[16/9]" : b.kind === "pairL" ? "aspect-[16/10]" : "aspect-[4/5]";
              const fullw = b.kind === "pano" || b.kind === "big";
              return (
              <motion.div
                key={`${cat}-${bi}`}
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={grid ? "grid gap-6 md:grid-cols-2" : b.kind === "solo" ? "mx-auto w-full max-w-md" : ""}
              >
                {b.idx.map((k) => {
                  const w = list[k];
                  return (
                    <figure
                      key={k}
                      onClick={() => setSelected(k)}
                      className={`group relative m-0 cursor-zoom-in overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] ${aspect}`}
                    >
                      <Image
                        src={w.src}
                        alt={w.alt}
                        fill
                        loading="lazy"
                        sizes={fullw ? "100vw" : "(max-width:768px) 100vw, 50vw"}
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0)_55%,rgba(4,6,10,0.7))] opacity-85 transition-opacity duration-300 group-hover:opacity-100" />
                      <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5 md:p-6">
                        {w.detail ? (
                          <span className="text-base font-medium text-white/95 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-lg">{w.detail}</span>
                        ) : (
                          <span />
                        )}
                        <span className="shrink-0 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#ead8b0] backdrop-blur-md">{w.label}</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </motion.div>
              );
            })}
          </div>
        </section>

        {/* Contatti + chi siamo */}
        <section id="contatti" className="py-12">
          <div className="rounded-[36px] border border-[#d8b46a]/18 bg-[linear-gradient(135deg,rgba(216,180,106,0.12),rgba(255,255,255,0.03))] p-7 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#ead8b0]">{t.contactEyebrow}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-6xl">{t.contactTitle}</h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">{t.contactLine}</p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <button type="button" onClick={() => setQuoteOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#090b10] transition-transform duration-300 hover:-translate-y-0.5">
                  {t.contactBtn} <ArrowUpRight className="h-4 w-4" />
                </button>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/55 lg:justify-end">
                  <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="transition-colors hover:text-white">{CONTACT_PHONE}</a>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-white">{CONTACT_EMAIL}</a>
                </div>
              </div>
            </div>

            {/* Chi siamo — foto piccole, una riga a testa */}
            <div className="mt-12 border-t border-white/10 pt-9">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#8d94a5]">{t.teamTag}</p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {team.map((m, mi) => (
                  <motion.figure
                    key={m.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: mi * 0.06 }}
                    className="m-0 flex items-center gap-4"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/15">
                      <Image src={m.src} alt={m.name} fill loading="lazy" sizes="64px" className="object-cover" />
                    </div>
                    <figcaption className="min-w-0">
                      <div className="text-[15px] font-semibold text-white">{m.name}</div>
                      <div className="mt-1 text-xs leading-5 text-[#9ea6b8]">{lang === "it" ? m.roleIt : m.roleEn}</div>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#7f8797] md:flex-row md:items-center md:justify-between">
          <span className="relative h-6 w-[82px]">
            <Image src="/twentyfour-logo-clean.png" alt="24 Rigging" fill sizes="82px" className="object-contain object-left opacity-80" />
          </span>
          <span className="uppercase tracking-[0.26em]">{t.footer}</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>24 Rigging · Roma, Italia</span>
            <span className="flex items-center gap-2 uppercase tracking-[0.26em]">
              <Globe2 className="h-3.5 w-3.5" /> IT / EN
            </span>
          </span>
        </footer>
      </motion.div>

      {/* Contatti: Email o WhatsApp */}
      {quoteOpen ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/82 px-4 backdrop-blur-xl" onClick={() => setQuoteOpen(false)}>
          <div className="relative w-full max-w-md rounded-[28px] border border-white/12 bg-[#0a0d13] p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label={t.close} onClick={() => setQuoteOpen(false)} className="absolute right-4 top-4 text-white/55 transition-colors hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#ead8b0]">{t.quoteTitle}</div>
            <h3 className="mt-3 text-2xl font-semibold text-white">{t.quoteText}</h3>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={bookingHref(t.bookSubject, t.bookBody)}
                {...(BOOKING_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b46a] px-6 py-3.5 text-sm font-semibold text-[#0d0f14] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <CalendarClock className="h-4 w-4" /> {t.bookBtn}
              </a>
              <a href={`https://wa.me/${CONTACT_WHATSAPP}?text=Ciao%2C%20vorrei%20parlare%20di%20un%20progetto%20con%2024%20Rigging`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#06210f] transition-transform duration-300 hover:-translate-y-0.5">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("24 Rigging — Progetto")}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/30">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
            <div className="mt-5 text-xs tracking-wide text-white/45">{CONTACT_PHONE} · {CONTACT_EMAIL}</div>
          </div>
        </div>
      ) : null}

      {/* Lightbox — immagine intera, senza crop */}
      {work ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-xl" onClick={() => close()}>
          <button type="button" aria-label="prev" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 backdrop-blur-md transition-colors hover:border-white/30 md:left-8">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="next" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 backdrop-blur-md transition-colors hover:border-white/30 md:right-8">
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="relative flex w-full max-w-6xl flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[78vh] w-full overflow-hidden rounded-[24px]">
              <Image key={work.src} src={work.src} alt={work.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.34em] text-[#ead8b0]">{work.label}</div>
                {work.detail ? <div className="mt-1 text-lg font-semibold text-white">{work.detail}</div> : null}
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/85">{(selected ?? 0) + 1} / {list.length}</span>
                <button type="button" aria-label={t.close} onClick={() => close()} className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/90 transition-colors hover:border-white/30">
                  <X className="h-3.5 w-3.5" /> {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
