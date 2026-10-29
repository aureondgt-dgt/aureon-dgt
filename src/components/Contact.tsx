import { useEffect, useRef, useState } from "react";
import { CONTACT, IconArrow, IconInsta, IconMail, IconWhats, LogoMark, Reveal, SectionTag, TiltCard, waLink } from "./ui";

const kinds = ["Landing Page", "Site Institucional", "Cardápio Digital", "Portfólio", "Catálogo", "Ainda não sei"];

export function Contact() {
  const [name, setName] = useState("");
  const [biz, setBiz] = useState("");
  const [kind, setKind] = useState(kinds[0]);
  const [copied, setCopied] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá, Aureon! 👋\n\nMeu nome é ${name || "—"}.\nMeu negócio: ${biz || "—"}\nTipo de site: ${kind}\n\nQuero um orçamento do meu site sem mensalidade! 🚀`;
    window.open(waLink(msg), "_blank");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const cards = [
    { icon: <IconWhats className="h-7 w-7" />, label: "WhatsApp", value: CONTACT.whatsDisplay, href: waLink(), cta: "Chamar agora" },
    { icon: <IconInsta className="h-7 w-7" />, label: "Instagram", value: `@${CONTACT.insta}`, href: CONTACT.instaUrl, cta: "Seguir" },
    { icon: <IconMail className="h-7 w-7" />, label: "E-mail", value: CONTACT.email, href: `mailto:${CONTACT.email}`, cta: "Enviar e-mail" },
  ];

  return (
    <section id="contato" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:py-32">
      <Reveal className="text-center">
        <SectionTag>Contato</SectionTag>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
          Bora colocar seu negócio <span className="chrome-text">no próximo nível?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-zinc-400 sm:text-lg">Orçamento grátis, resposta rápida e zero enrolação.</p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 100}>
            <TiltCard className="glass group rounded-3xl">
              <a href={c.href} target="_blank" rel="noreferrer" className="block p-7" style={{ transform: "translateZ(30px)" }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                  {c.icon}
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-500">{c.label}</div>
                <div className="mt-1 break-all font-display text-xl font-semibold">{c.value}</div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-300 transition-all group-hover:gap-3 group-hover:text-white">
                  {c.cta} <IconArrow />
                </div>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        <form onSubmit={send} className="glass mt-5 grid gap-6 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h3 className="font-display text-3xl font-bold">Peça seu orçamento em 10 segundos</h3>
            <p className="mt-3 text-zinc-400">Preencha e a mensagem já vai pronta para o nosso WhatsApp.</p>
            <button type="button" onClick={copyEmail} className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/40 hover:text-white">
              <IconMail className="h-4 w-4" /> {copied ? "E-mail copiado! ✓" : "Copiar e-mail"}
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="field" />
              <input value={biz} onChange={(e) => setBiz(e.target.value)} placeholder="Seu negócio (ex: barbearia)" className="field" />
            </div>
            <div>
              <div className="mb-2 text-sm text-zinc-400">Que tipo de site você precisa?</div>
              <div className="flex flex-wrap gap-2">
                {kinds.map((k) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => setKind(k)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${kind === k ? "border-white bg-white font-semibold text-black" : "border-white/15 text-zinc-300 hover:border-white/40"}`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn-chrome flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-black">
              <IconWhats /> Enviar pelo WhatsApp
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <div>
              <div className="font-display text-xl font-bold tracking-[0.3em] chrome-text">AUREON</div>
              <div className="text-xs text-zinc-500">Sites profissionais · sem mensalidade</div>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              [<IconWhats key="w" />, waLink(), "WhatsApp"],
              [<IconInsta key="i" />, CONTACT.instaUrl, "Instagram"],
              [<IconMail key="m" />, `mailto:${CONTACT.email}`, "E-mail"],
            ].map(([icon, href, label]) => (
              <a key={label as string} href={href as string} target="_blank" rel="noreferrer" aria-label={label as string} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black">
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-white/5 pt-6 text-xs text-zinc-600 sm:flex-row">
          <span>© {new Date().getFullYear()} Aureon Digital. Todos os direitos reservados.</span>
          <span>
            {CONTACT.whatsDisplay} · @{CONTACT.insta} · {CONTACT.email}
          </span>
        </div>
      </div>
      <div className="pointer-events-none select-none text-center font-display text-[22vw] font-bold leading-[0.75] tracking-tighter text-white/[0.04]">AUREON</div>
    </footer>
  );
}

export function FloatingWhats() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className={`group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-[0_10px_40px_rgba(37,211,102,0.5)] transition-all duration-500 hover:scale-105 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <IconWhats className="relative h-7 w-7" />
      <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-all duration-500 group-hover:max-w-[200px] sm:inline">Fale conosco</span>
    </a>
  );
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    window.addEventListener("pointermove", f);
    return () => window.removeEventListener("pointermove", f);
  }, []);
  return <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_60%)] md:block" />;
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return <div ref={ref} className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-zinc-500 via-white to-zinc-500" />;
}
