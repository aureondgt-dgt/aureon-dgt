import { useEffect, useState } from "react";
import { IconArrow, IconWhats, LogoMark, waLink } from "./ui";

const links = [
  ["Economia", "#economia"],
  ["Sites", "#sites"],
  ["Processo", "#processo"],
  ["Oferta", "#oferta"],
  ["FAQ", "#faq"],
  ["Contato", "#contato"],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-500 md:px-6 ${
          scrolled ? "border-white/10 bg-black/60 shadow-2xl shadow-black/50 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <LogoMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="font-display text-lg font-bold tracking-[0.3em] chrome-text">AUREON</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
              {l}
            </a>
          ))}
        </div>
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          className="btn-chrome hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black md:inline-flex"
        >
          <IconWhats className="h-4 w-4" /> Orçamento grátis
        </a>
        <button onClick={() => setOpen(!open)} className="relative h-10 w-10 lg:hidden md:ml-3" aria-label="Menu">
          <span className={`absolute left-2 right-2 h-0.5 bg-white transition-all ${open ? "top-5 rotate-45" : "top-3.5"}`} />
          <span className={`absolute left-2 right-2 h-0.5 bg-white transition-all ${open ? "top-5 -rotate-45" : "top-6"}`} />
        </button>
      </nav>
      <div
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <div className="flex flex-col p-3">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5">
              {l}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-chrome mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-black">
            <IconWhats className="h-4 w-4" /> Chamar no WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

const words = ["profissional", "moderno", "rápido", "que vende", "seu"];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end pb-16 pt-32 lg:items-center lg:pb-0">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="max-w-2xl pt-[38vh] lg:pt-0">
          <div className="hero-in" style={{ animationDelay: "1.4s" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs text-zinc-300 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Agenda aberta · Atendimento para todo o Brasil
            </span>
          </div>

          <h1 className="hero-in mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: "1.55s" }}>
            <span className="text-white">Seu site</span>
            <br />
            <span className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
              {words.map((w, idx) => (
                <span
                  key={w}
                  className={`chrome-text absolute left-0 top-0 whitespace-nowrap transition-all duration-700 ${
                    idx === i ? "translate-y-0 opacity-100" : idx === (i - 1 + words.length) % words.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
                  }`}
                >
                  {w}
                </span>
              ))}
              <span className="invisible">profissional</span>
            </span>
            <br />
            <span className="text-white">por </span>
            <span className="text-white/40 line-through decoration-2">R$ 5 mil</span>{" "}
            <span className="chrome-text">menos de R$ 1.000</span>
          </h1>

          <p className="hero-in mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg" style={{ animationDelay: "1.7s" }}>
            Pagamento <strong className="text-white">único</strong>. <strong className="text-white">Zero mensalidade.</strong> Design premium,
            100% responsivo e pronto para colocar sua empresa no topo — o site é <strong className="text-white">seu pra sempre</strong>.
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "1.85s" }}>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-chrome group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-semibold text-black">
              <IconWhats /> Quero meu site agora
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#economia" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-medium text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10">
              Calcular minha economia
            </a>
          </div>

          <div className="hero-in mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6" style={{ animationDelay: "2s" }}>
            {[
              ["R$ 0", "por mês"],
              ["< 1k", "pagamento único"],
              ["100%", "responsivo"],
            ].map(([a, b]) => (
              <div key={b}>
                <div className="font-display text-2xl font-bold chrome-text sm:text-3xl">{a}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="#economia" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500 lg:flex">
        scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <span className="h-2 w-0.5 animate-bounce rounded-full bg-white" />
        </span>
      </a>
    </section>
  );
}
