"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Crown,
  Globe2,
  Mail,
  MessageCircle,
  X,
} from "lucide-react";

type Lang = "it" | "en";

type Cat = "concerti" | "strutture" | "engineering" | "backstage";

type Work = {
  src: string;
  label: string;
  detail: string; // placeholder da far compilare ai soci
  alt: string;
  cat: Cat;
  o: "pano" | "land" | "port"; // forma: panoramica (≥2:1) / orizzontale / verticale
};

const HERO = "/portfolio_gallery/portfolio-09.jpeg"; // crowd-scale, coriandoli — foto anteprima

const copy = {
  it: {
    loading: "Montaggio palco",
    nav: ["Lavori", "Preventivo", "Contatti"],
    eyebrow: "Rigging · Motion · Automazione per il live",
    titleTop: "Rigging invisibile.",
    titleBottom: "Spettacolo indimenticabile.",
    heroLine: "Progettiamo l'invisibile. Tu vedi solo lo spettacolo.",
    primary: "Richiedi un preventivo",
    secondary: "Lavori",
    whyTag: "Perché 24Rigging",
    why: [
      ["Esperienza", "Decenni in quota, sui palchi che contano."],
      ["Innovazione", "Tecnologia e R&S proprietarie. Brevetto in arrivo."],
      ["Dettaglio", "Ogni grammo calcolato. Niente lasciato al caso."],
      ["Scala globale", "Installazioni per palchi di tutto il mondo."],
    ],
    galleryTag: "Lavori",
    galleryHint: "foto",
    filters: { tutti: "Tutti", concerti: "Concerti", strutture: "Strutture", engineering: "Engineering", backstage: "Backstage" },
    teamTag: "Il team",
    teamLine: "Decenni in quota, sui palchi che contano.",
    contactEyebrow: "Il prossimo show",
    contactTitle: "Parliamo del tuo palco.",
    contactBtn: "Richiedi un preventivo",
    footer: "Rigging, motion e automazione per il live.",
    soundOn: "Audio",
    quoteTitle: "Preventivo",
    quoteText: "Come preferisci contattarci?",
  },
  en: {
    loading: "Rigging the stage",
    nav: ["Work", "Quote", "Contact"],
    eyebrow: "Rigging · Motion · Automation for live",
    titleTop: "Invisible rigging.",
    titleBottom: "Unforgettable show.",
    heroLine: "We engineer the invisible. You only see the show.",
    primary: "Request a quote",
    secondary: "Work",
    whyTag: "Why 24Rigging",
    why: [
      ["Experience", "Decades at height, on the stages that matter."],
      ["Innovation", "In-house tech and R&D. Patent on the way."],
      ["Detail", "Every gram calculated. Nothing left to chance."],
      ["Global scale", "Installations for stages around the world."],
    ],
    galleryTag: "Work",
    galleryHint: "photos",
    filters: { tutti: "All", concerti: "Concerts", strutture: "Structures", engineering: "Engineering", backstage: "Backstage" },
    teamTag: "The team",
    teamLine: "Decades at height, on the stages that matter.",
    contactEyebrow: "The next show",
    contactTitle: "Let's talk about your stage.",
    contactBtn: "Request a quote",
    footer: "Rigging, motion and automation for live.",
    soundOn: "Sound",
    quoteTitle: "Quote",
    quoteText: "How would you like to reach us?",
  },
} as const;

/* Solo foto in alta qualità, curate e categorizzate (i video erano a bassa risoluzione → esclusi).
   detail = placeholder da far compilare ai soci con i dati reali dell'evento. */
const works: Work[] = [
  // ---- Concerti / show ----
  { src: "/portfolio_gallery/con-1.jpeg", label: "Crowd", detail: "[Artista] · [Città] · [Anno]", alt: "Stadio gremito davanti al palco con rig completo.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-3.jpeg", label: "Live", detail: "[Artista] · [Città] · [Anno]", alt: "Show con scenografia illuminata e fasci di luce.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-5.jpeg", label: "Show design", detail: "[Artista] · [Città] · [Anno]", alt: "Scenografia di concerto con luci e strutture verticali.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-6.jpeg", label: "Live", detail: "[Artista] · [Città] · [Anno]", alt: "Maxischermo e pubblico durante lo show.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-7.jpeg", label: "Live", detail: "[Artista] · [Città] · [Anno]", alt: "Palco panoramico con impianto luci durante il concerto.", cat: "concerti", o: "land" },
  { src: "/portfolio_gallery/con-8.jpeg", label: "Live", detail: "[Artista] · [Città] · [Anno]", alt: "Show all'aperto con maxischermo e struttura scenica.", cat: "concerti", o: "land" },
  // ---- Strutture / truss ----
  { src: "/portfolio_gallery/str-1.jpeg", label: "Structure", detail: "[Venue] · [Anno]", alt: "Cupola strutturale vista dal basso, geometria circolare di truss.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-2.jpeg", label: "Structure", detail: "[Venue] · [Anno]", alt: "Facciata geometrica di travi reticolari controluce.", cat: "strutture", o: "port" },
  { src: "/portfolio_gallery/str-3.jpeg", label: "Structure", detail: "[Venue] · [Anno]", alt: "Grande struttura scenica con griglia di rigging sospesa.", cat: "strutture", o: "port" },
  { src: "/portfolio_gallery/str-4.jpeg", label: "Stadio", detail: "[Venue] · [Anno]", alt: "Allestimento del palco di un concerto in uno stadio, vista dall'alto.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-5.jpeg", label: "Stadio", detail: "[Venue] · [Anno]", alt: "Palco e struttura di un concerto in uno stadio, panoramica.", cat: "strutture", o: "pano" },
  { src: "/portfolio_gallery/str-6.jpeg", label: "Truss grid", detail: "[Venue] · [Anno]", alt: "Griglia di truss backstage con segnaletica di sicurezza.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-7.jpeg", label: "Venue", detail: "[Venue] · [Anno]", alt: "Interno di venue con struttura di rigging completa.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-8.jpeg", label: "Build", detail: "[Venue] · [Anno]", alt: "Allestimento strutturale con postazioni tecniche.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-9.jpeg", label: "Truss", detail: "[Venue] · [Anno]", alt: "Struttura di truss con tecnici al lavoro in quota.", cat: "strutture", o: "land" },
  { src: "/portfolio_gallery/str-10.jpeg", label: "Stadio", detail: "[Venue] · [Anno]", alt: "Stadio visto dall'alto durante l'allestimento del concerto, con tecnico in primo piano.", cat: "strutture", o: "pano" },
  { src: "/portfolio_gallery/str-11.jpeg", label: "Truss", detail: "[Venue] · [Anno]", alt: "Travi di truss sospese in studio durante il montaggio, con tecnici al lavoro.", cat: "strutture", o: "land" },
  // ---- Engineering (disegni tecnici, plot di carico) ----
  { src: "/portfolio_gallery/portfolio-24.jpeg", label: "Engineering", detail: "Disegno tecnico · [Progetto]", alt: "Disegno tecnico CAD di un truss automatizzato con quote e sezioni.", cat: "engineering", o: "land" },
  { src: "/portfolio_gallery/portfolio-25.jpeg", label: "Engineering", detail: "Plot di carico · [Progetto]", alt: "Plot di carico del rigging: distribuzione dei pesi sui motori.", cat: "engineering", o: "land" },
  { src: "/portfolio_gallery/eng-3.jpeg", label: "Engineering", detail: "Layout strutturale · [Progetto]", alt: "Layout CAD di progetto con pianta e griglia dei carichi.", cat: "engineering", o: "port" },
  // ---- Backstage / crew / high access ----
  { src: "/portfolio_gallery/bks-2.jpeg", label: "Build", detail: "[Crew] · [Anno]", alt: "Tecnico al lavoro su una struttura con vista sullo stadio.", cat: "backstage", o: "land" },
  { src: "/portfolio_gallery/bks-1.jpeg", label: "High access", detail: "[Crew] · [Anno]", alt: "Rigger in quota in controluce al tramonto su una struttura.", cat: "backstage", o: "port" },
  { src: "/portfolio_gallery/bks-3.jpeg", label: "High access", detail: "[Crew] · [Anno]", alt: "Tecnico che sale in quota su una torre di rigging.", cat: "backstage", o: "port" },
  { src: "/portfolio_gallery/bks-6.jpeg", label: "Build", detail: "[Crew] · [Anno]", alt: "Allestimento del palco con crew e attrezzature.", cat: "backstage", o: "pano" },
  { src: "/portfolio_gallery/bks-5.jpeg", label: "Crew", detail: "[Crew] · [Anno]", alt: "Operatore alla gru durante il montaggio della struttura.", cat: "backstage", o: "port" },
];

const CATS: ("tutti" | Cat)[] = ["tutti", "concerti", "strutture", "engineering", "backstage"];

const team = [
  { name: "Giorgio Sala", src: "/portfolio_gallery/team-sala.jpeg", roleIt: "Co-founder · Progetti rigging & Innovazione", roleEn: "Co-founder · Rigging Projects & Innovation" },
  { name: "Antonella Serra", src: "/portfolio_gallery/team-serra.jpeg", roleIt: "Co-founder · Architettura & Planimetrie", roleEn: "Co-founder · Architecture & Layouts" },
  { name: "Matteo D'Angelo", src: "/portfolio_gallery/team-dangelo.jpeg", roleIt: "Co-founder · Rigging Specialist", roleEn: "Co-founder · Rigging Specialist" },
] as const;

/* Ordina la lista per forma: le panoramiche (≥2:1) restano singole a tutta larghezza,
   le orizzontali e le verticali si affiancano in coppia con i propri simili (niente crop strani).
   Interleva pano / coppie-orizzontali / coppie-verticali per varietà, mantenendo adiacenti
   gli elementi che vanno accoppiati. */
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
  const [cat, setCat] = useState<"tutti" | Cat>("tutti");
  const t = copy[lang];
  const loading = false; // intro/loader rimosso su richiesta: il sito appare subito

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

  // Audio rimosso su richiesta: nessun suono UI. sfx() resta come no-op per non toccare i call site.
  const sfx = useCallback((_kind: "hover" | "click" | "open" | "close" | "nav") => {
    /* no-op */
  }, []);

  const close = useCallback(() => setSelected(null), []);
  const next = useCallback(() => setSelected((i) => (i === null ? i : (i + 1) % list.length)), [list.length]);
  const prev = useCallback(() => setSelected((i) => (i === null ? i : (i - 1 + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sfx("close");
        close();
      }
      if (e.key === "ArrowRight") {
        sfx("nav");
        next();
      }
      if (e.key === "ArrowLeft") {
        sfx("nav");
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close, next, prev, sfx]);

  const work = selected === null ? null : list[selected];

  // card-stream aspect-aware: panoramica a tutta larghezza (2:1), orizzontali in 16:9 (singola)
  // o 16:10 (coppia), verticali in coppia 4:5; ogni foto nella sua forma → niente crop strani.
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070b] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,106,0.16),_transparent_32%),radial-gradient(circle_at_80%_10%,_rgba(59,130,246,0.12),_transparent_22%),linear-gradient(180deg,_#07090e_0%,_#05070b_40%,_#040507_100%)]" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto max-w-[1680px] px-4 pb-20 pt-5 md:px-8 lg:px-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-md">
          <div className="relative h-12 w-[168px] md:h-14 md:w-[198px]">
            <Image src="/twentyfour-logo-clean.png" alt="24 Rigging" fill priority sizes="198px" className="object-contain object-left" />
          </div>
          <nav className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.24em] text-[#bcc2d1] md:flex">
            <Link href="#lavori" className="transition-colors hover:text-white">{t.nav[0]}</Link>
            <Link href="#team" className="transition-colors hover:text-white">{t.teamTag}</Link>
            <button type="button" onClick={() => { sfx("open"); setQuoteOpen(true); }} className="uppercase tracking-[0.24em] transition-colors hover:text-white">{t.nav[1]}</button>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-white/10 bg-black/20 p-1 text-[11px] uppercase tracking-[0.22em]">
              {(["it", "en"] as Lang[]).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} className={`rounded-full px-3 py-1.5 transition-colors ${lang === l ? "bg-white text-[#05070b]" : "text-[#b7bfd0]"}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Hero — FOTO crowd-scale ad alta qualità con lento zoom (Ken Burns) */}
        <section className="relative mt-6 overflow-hidden rounded-[40px] border border-white/10">
          <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1.02 }} transition={{ duration: 16, ease: "easeOut" }} className="absolute inset-0">
            <Image src={HERO} alt="Stadium gremito davanti a un rig completo, con coriandoli che cadono." fill priority sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.30),rgba(4,6,10,0.86))]" />
          <div className="relative flex min-h-[82vh] flex-col justify-end p-7 md:p-14">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: loading ? 0 : 1, y: loading ? 30 : 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b46a]/25 bg-[#d8b46a]/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#f0d8a3]">
                <Crown className="h-3.5 w-3.5" />
                {t.eyebrow}
              </div>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
                {t.titleTop}
                <span className="block text-[#d8b46a]">{t.titleBottom}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">{t.heroLine}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => { sfx("open"); setQuoteOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b46a] px-6 py-3.5 text-sm font-semibold text-[#0d0f14] transition-transform duration-300 hover:-translate-y-0.5">
                  {t.primary} <ArrowUpRight className="h-4 w-4" />
                </button>
                <Link href="#lavori" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/30">
                  {t.secondary} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lavori — gallery masonry pulita */}
        <section id="lavori" className="py-16">
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
                    sfx("nav");
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
          {/* Card-stream verticale (stile errearquitectura): grandi immagini che scorrono dall'alto verso il basso */}
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
                      onMouseEnter={() => sfx("hover")}
                      onClick={() => {
                        sfx("click");
                        setSelected(k);
                      }}
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
                        <span className="text-base font-medium text-white/95 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-lg">{w.detail}</span>
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

        {/* Perché 24Rigging */}
        <section className="py-10">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight md:text-5xl">{t.whyTag}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.why.map(([title, text]) => (
              <div key={title} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="text-lg font-semibold text-[#d8b46a]">{title}</div>
                <p className="mt-3 text-sm leading-7 text-[#abb3c7]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team / Founder */}
        <section id="team" className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.teamTag}</h2>
            <p className="max-w-sm text-sm leading-7 text-[#abb3c7]">{t.teamLine}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, mi) => (
              <motion.figure
                key={m.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: mi * 0.08 }}
                onMouseEnter={() => sfx("hover")}
                className="group relative m-0 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={m.src} alt={m.name} fill loading="lazy" sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0)_45%,rgba(4,6,10,0.85))]" />
                </div>
                <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#ead8b0]">{lang === "it" ? m.roleIt : m.roleEn}</div>
                  <div className="mt-1.5 text-xl font-semibold text-white">{m.name}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* Contatti / Preventivo */}
        <section id="contatti" className="py-12">
          <div className="rounded-[36px] border border-[#d8b46a]/18 bg-[linear-gradient(135deg,rgba(216,180,106,0.12),rgba(255,255,255,0.03))] p-7 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#ead8b0]">{t.contactEyebrow}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-6xl">{t.contactTitle}</h2>
              </div>
              <div className="flex lg:justify-end">
                <button type="button" onClick={() => { sfx("open"); setQuoteOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#090b10] transition-transform duration-300 hover:-translate-y-0.5">
                  {t.contactBtn} <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.26em] text-[#7f8797] md:flex-row md:items-center md:justify-between">
          <span className="relative h-6 w-[82px]">
            <Image src="/twentyfour-logo-clean.png" alt="24 Rigging" fill sizes="82px" className="object-contain object-left opacity-80" />
          </span>
          <span>{t.footer}</span>
          <span className="flex items-center gap-2">
            <Globe2 className="h-3.5 w-3.5" /> IT / EN
          </span>
        </footer>
      </motion.div>

      {/* Scelta preventivo: Email o WhatsApp */}
      {quoteOpen ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/82 px-4 backdrop-blur-xl" onClick={() => { sfx("close"); setQuoteOpen(false); }}>
          <div className="relative w-full max-w-md rounded-[28px] border border-white/12 bg-[#0a0d13] p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="close" onClick={() => { sfx("close"); setQuoteOpen(false); }} className="absolute right-4 top-4 text-white/55 transition-colors hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#ead8b0]">{t.quoteTitle}</div>
            <h3 className="mt-3 text-2xl font-semibold text-white">{t.quoteText}</h3>
            <div className="mt-7 flex flex-col gap-3">
              <a href="https://wa.me/393398968874?text=Ciao%20Giorgio%2C%20vorrei%20un%20preventivo%20per%20un%20evento" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#06210f] transition-transform duration-300 hover:-translate-y-0.5">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href="mailto:sala.giorgio24@gmail.com?subject=24%20Rigging%20%E2%80%94%20Preventivo" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/30">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
            <div className="mt-5 text-xs tracking-wide text-white/45">+39 339 896 8874 · sala.giorgio24@gmail.com</div>
          </div>
        </div>
      ) : null}

      {/* Lightbox — immagine intera, senza crop */}
      {work ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-xl" onClick={() => { sfx("close"); close(); }}>
          <button type="button" aria-label="prev" onClick={(e) => { e.stopPropagation(); sfx("nav"); prev(); }} className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 backdrop-blur-md transition-colors hover:border-white/30 md:left-8">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="next" onClick={(e) => { e.stopPropagation(); sfx("nav"); next(); }} className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 backdrop-blur-md transition-colors hover:border-white/30 md:right-8">
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="relative flex w-full max-w-6xl flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[78vh] w-full overflow-hidden rounded-[24px]">
              <Image key={work.src} src={work.src} alt={work.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.34em] text-[#ead8b0]">{work.label}</div>
                <div className="mt-1 text-lg font-semibold text-white">{work.detail}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/85">{(selected ?? 0) + 1} / {list.length}</span>
                <button type="button" aria-label="close" onClick={() => { sfx("close"); close(); }} className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/90 transition-colors hover:border-white/30">
                  <X className="h-3.5 w-3.5" /> {lang === "it" ? "Chiudi" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
