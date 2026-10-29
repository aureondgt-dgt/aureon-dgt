import { useState, type ReactNode } from "react";
import { brl, IconArrow, IconCheck, IconWhats, IconX, LogoMark, Reveal, SectionTag, TiltCard, useCountUp, waLink } from "./ui";

/* ---------------- MARQUEE ---------------- */
export function Marquee() {
  const items = ["Sem mensalidade", "Pagamento único", "Menos de R$ 1.000", "Design premium", "100% responsivo", "Otimizado para Google", "Botão de WhatsApp", "Site rápido"];
  const row = [...items, ...items];
  return (
    <div className="relative z-10 -rotate-2 border-y border-white/10 bg-white py-4 text-black shadow-[0_0_80px_rgba(255,255,255,0.15)]">
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-xl font-bold uppercase tracking-wider sm:text-2xl">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <LogoMark className="h-6 w-6 invert" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SECTION WRAPPER ---------------- */
function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

function Heading({ tag, title, sub }: { tag: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <SectionTag>{tag}</SectionTag>
      <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {sub && <p className="mx-auto mt-5 max-w-2xl text-zinc-400 sm:text-lg">{sub}</p>}
    </Reveal>
  );
}

/* ---------------- CALCULATOR ---------------- */
const AUREON_MAX = 999;

export function Calculator() {
  const [setup, setSetup] = useState(2500);
  const [monthly, setMonthly] = useState(150);
  const [years, setYears] = useState(3);
  const others = setup + monthly * 12 * years;
  const saving = Math.max(others - AUREON_MAX, 0);
  const animOthers = useCountUp(others);
  const animSaving = useCountUp(saving);
  const ratio = Math.min(AUREON_MAX / others, 1);

  return (
    <Section id="economia">
      <Heading
        tag="Calculadora de economia"
        title={
          <>
            Mensalidade é <span className="chrome-text">dinheiro jogado fora</span>
          </>
        }
        sub="Agências e plataformas cobram taxa de criação + mensalidade eterna. Com a Aureon você paga uma vez só. Arraste e veja quanto você economiza:"
      />

      <Reveal>
        <div className="glass grid gap-8 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8">
            <Slider label="Taxa de criação cobrada por outros" value={setup} min={0} max={8000} step={100} onChange={setSetup} format={brl} />
            <Slider label="Mensalidade (hospedagem/plataforma)" value={monthly} min={30} max={600} step={10} onChange={setMonthly} format={(v) => `${brl(v)}/mês`} />
            <Slider label="Por quanto tempo" value={years} min={1} max={10} step={1} onChange={setYears} format={(v) => `${v} ${v > 1 ? "anos" : "ano"}`} />

            <div className="space-y-4 pt-2">
              <Bar label="Outros" value={brl(Math.round(animOthers))} pct={100} dim />
              <Bar label="Aureon" value={`até ${brl(AUREON_MAX)}`} pct={Math.max(ratio * 100, 4)} />
            </div>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Você economiza</div>
              <div className="mt-3 font-display text-5xl font-bold tabular-nums chrome-text sm:text-6xl">{brl(Math.round(animSaving))}</div>
              <p className="mt-4 text-sm text-zinc-400">
                em {years} {years > 1 ? "anos" : "ano"} escolhendo a Aureon. Isso é {Math.max(Math.round(others / AUREON_MAX), 1)}x menos do que você pagaria
                no modelo tradicional.
              </p>
            </div>
            <div className="mt-8 space-y-3 text-sm">
              {[
                ["Mensalidade", `${brl(monthly)}/mês`, "R$ 0/mês"],
                ["Taxa de criação", brl(setup), "< R$ 1.000"],
                ["O site é seu?", "Não", "Sim, pra sempre"],
              ].map(([k, a, b]) => (
                <div key={k} className="grid grid-cols-3 items-center gap-2 border-b border-white/5 pb-3">
                  <span className="text-zinc-500">{k}</span>
                  <span className="flex items-center gap-1.5 text-zinc-500 line-through decoration-red-400/60">
                    <IconX className="h-3.5 w-3.5 shrink-0 text-red-400" />
                    {a}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-white">
                    <IconCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {b}
                  </span>
                </div>
              ))}
            </div>
            <a href={waLink(`Olá, Aureon! Usei a calculadora e vi que posso economizar ${brl(saving)}. Quero meu site!`)} target="_blank" rel="noreferrer" className="btn-chrome mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-black">
              <IconWhats className="h-4 w-4" /> Quero economizar
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="text-sm text-zinc-400">{label}</span>
        <span className="font-display text-lg font-semibold tabular-nums text-white">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range w-full" style={{ ["--p" as string]: `${pct}%` }} />
    </label>
  );
}

function Bar({ label, value, pct, dim }: { label: string; value: string; pct: number; dim?: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className={dim ? "text-zinc-500" : "font-semibold text-white"}>{label}</span>
        <span className={`tabular-nums ${dim ? "text-zinc-500" : "font-semibold text-white"}`}>{value}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full transition-all duration-700 ${dim ? "bg-gradient-to-r from-red-500/70 to-red-400/40" : "bar-chrome"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---------------- SITE TYPES ---------------- */
const types = [
  { t: "Landing Page", d: "Página única focada em converter visitantes em clientes. Ideal para campanhas e anúncios.", m: "landing" },
  { t: "Site Institucional", d: "Apresente sua empresa com várias seções: sobre, serviços, equipe, depoimentos e contato.", m: "inst" },
  { t: "Cardápio Digital", d: "Para restaurantes, lanchonetes e deliveries. Pedido direto no WhatsApp.", m: "menu" },
  { t: "Portfólio", d: "Para fotógrafos, arquitetos, designers e profissionais que precisam mostrar seus trabalhos.", m: "port" },
  { t: "Catálogo de Produtos", d: "Mostre seus produtos com fotos, preços e botão de compra pelo WhatsApp.", m: "shop" },
  { t: "Página de Links", d: "Muito melhor que link na bio genérico: uma página com a sua cara e sua marca.", m: "links" },
];

function Mock({ kind }: { kind: string }) {
  const bar = (w: string, o = "bg-white/20") => <div className={`h-1.5 rounded-full ${o}`} style={{ width: w }} />;
  return (
    <div className="relative h-40 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black">
      <div className="flex items-center gap-1 border-b border-white/5 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
        <div className="ml-2 h-1.5 w-20 rounded-full bg-white/10" />
      </div>
      <div className="space-y-2 p-3">
        {kind === "landing" && (
          <>
            <div className="mx-auto mt-2 h-3 w-3/4 rounded bg-white/70" />
            <div className="mx-auto h-3 w-1/2 rounded bg-white/40" />
            <div className="mx-auto mt-2 w-2/3 space-y-1">{bar("100%")}{bar("80%")}</div>
            <div className="mx-auto mt-3 h-5 w-24 rounded-full bg-white" />
          </>
        )}
        {kind === "inst" && (
          <>
            <div className="h-12 rounded-md bg-gradient-to-r from-white/30 to-white/5" />
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-10 rounded-md border border-white/10 bg-white/5 p-1.5">{bar("70%", "bg-white/40")}</div>
              ))}
            </div>
          </>
        )}
        {kind === "menu" && (
          <div className="space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-md bg-white/5 p-1.5">
                <div className="h-6 w-6 rounded bg-white/30" />
                <div className="flex-1 space-y-1">{bar("60%", "bg-white/40")}{bar("35%")}</div>
                <div className="h-2 w-8 rounded bg-emerald-400/70" />
              </div>
            ))}
          </div>
        )}
        {kind === "port" && (
          <div className="grid grid-cols-3 gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-[3.1rem] rounded-md ${i % 2 ? "bg-white/20" : "bg-white/40"}`} />
            ))}
          </div>
        )}
        {kind === "shop" && (
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-md border border-white/10 p-1.5">
                <div className="h-12 rounded bg-white/25" />
                <div className="mt-1.5 space-y-1">{bar("80%", "bg-white/40")}</div>
                <div className="mt-1.5 h-3 rounded bg-emerald-400/70" />
              </div>
            ))}
          </div>
        )}
        {kind === "links" && (
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-8 w-8 rounded-full bg-white/60" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-4 w-3/4 rounded-full border border-white/20 bg-white/10" />
            ))}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

export function SiteTypes() {
  return (
    <Section id="sites">
      <Heading
        tag="O que criamos"
        title={
          <>
            Um site para <span className="chrome-text">cada negócio</span>
          </>
        }
        sub="Do pequeno empreendedor à empresa consolidada. Todos com design exclusivo, sem templates genéricos."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((s, i) => (
          <Reveal key={s.t} delay={i * 80}>
            <TiltCard className="glass group rounded-3xl p-5">
              <div style={{ transform: "translateZ(40px)" }}>
                <Mock kind={s.m} />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3" style={{ transform: "translateZ(25px)" }}>
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.d}</p>
                </div>
                <span className="mt-1 text-xs font-medium text-zinc-600">0{i + 1}</span>
              </div>
              <a href={waLink(`Olá, Aureon! Tenho interesse em um(a) ${s.t}.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition group-hover:gap-3 group-hover:text-white" style={{ transform: "translateZ(20px)" }}>
                Quero esse <IconArrow />
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- INCLUDED BENTO ---------------- */
export function Included() {
  return (
    <Section>
      <Heading
        tag="Tudo incluso"
        title={
          <>
            Qualidade de agência. <br className="hidden sm:block" />
            <span className="chrome-text">Preço de verdade.</span>
          </>
        }
      />
      <div className="grid auto-rows-[minmax(180px,auto)] gap-5 md:grid-cols-6">
        <Reveal className="md:col-span-4">
          <TiltCard max={6} className="glass flex flex-col justify-between overflow-hidden rounded-3xl p-8">
            <div>
              <div className="text-5xl">📱</div>
              <h3 className="mt-4 font-display text-2xl font-semibold">100% responsivo</h3>
              <p className="mt-2 max-w-md text-zinc-400">Perfeito no celular, tablet e computador. Mais de 80% dos seus clientes vão acessar pelo celular — e vai ficar impecável.</p>
            </div>
            <div className="mt-6 flex items-end gap-3">
              <div className="h-24 w-40 rounded-lg border border-white/15 bg-white/5" />
              <div className="h-20 w-14 rounded-lg border border-white/15 bg-white/5" />
              <div className="h-14 w-8 rounded-md border border-white/15 bg-white/10" />
            </div>
          </TiltCard>
        </Reveal>
        <Reveal className="md:col-span-2" delay={100}>
          <TiltCard className="flex flex-col justify-between rounded-3xl bg-white p-8 text-black">
            <div className="font-display text-6xl font-bold">R$0</div>
            <div>
              <h3 className="font-display text-xl font-semibold">de mensalidade</h3>
              <p className="mt-1 text-sm text-zinc-600">Nunca. Nem escondido em letra miúda.</p>
            </div>
          </TiltCard>
        </Reveal>
        {[
          ["⚡", "Carregamento rápido", "Sites leves e otimizados, que abrem em segundos."],
          ["🔎", "SEO para Google", "Estrutura pensada para ser encontrado nas buscas."],
          ["💬", "Botão de WhatsApp", "Cliente chama você com um clique."],
          ["🔒", "HTTPS seguro", "Cadeado de segurança no navegador."],
          ["🎨", "Design exclusivo", "Feito com a identidade da sua marca."],
          ["📍", "Mapa e redes", "Localização, Instagram e contatos integrados."],
        ].map(([e, t, d], i) => (
          <Reveal key={t} className="md:col-span-2" delay={i * 70}>
            <TiltCard className="glass rounded-3xl p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">{e}</div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-zinc-400">{d}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- PROCESS ---------------- */
const steps = [
  ["Conversa no Zap", "Você chama no WhatsApp e conta sobre seu negócio. Sem compromisso e sem enrolação."],
  ["Proposta & briefing", "Definimos o tipo de site, seções, cores e conteúdo. Valor fechado, menos de R$ 1.000."],
  ["Criação do design", "Desenvolvemos seu site com design premium. Você acompanha e pede ajustes."],
  ["Site no ar 🚀", "Publicamos seu site e ele é seu para sempre. Sem nenhuma mensalidade."],
];

export function Process() {
  return (
    <Section id="processo">
      <Heading
        tag="Como funciona"
        title={
          <>
            Do zap ao <span className="chrome-text">site no ar</span>
          </>
        }
        sub="Um processo simples, transparente e rápido."
      />
      <div className="relative">
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent md:left-1/2" />
        <div className="space-y-10 md:space-y-4">
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className={`relative flex items-center gap-6 md:gap-0 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black font-display font-bold shadow-[0_0_30px_rgba(255,255,255,0.25)] md:absolute md:left-1/2 md:-translate-x-1/2">
                  {i + 1}
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 ? "md:pl-16" : "md:pr-16"}`}>
                  <TiltCard className="glass rounded-3xl p-7">
                    <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Passo 0{i + 1}</div>
                    <h3 className="mt-2 font-display text-2xl font-semibold">{t}</h3>
                    <p className="mt-2 text-zinc-400">{d}</p>
                  </TiltCard>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- OFFER ---------------- */
export function Offer() {
  const list = [
    "Design exclusivo e moderno",
    "Adaptado para celular, tablet e PC",
    "Botão direto para o seu WhatsApp",
    "Integração com Instagram e redes",
    "Otimização básica para Google (SEO)",
    "Formulário / contatos e mapa",
    "Publicação do site inclusa",
    "Sem mensalidade, sem fidelidade",
  ];
  return (
    <Section id="oferta">
      <Heading
        tag="Oferta"
        title={
          <>
            Um preço. <span className="chrome-text">Uma vez.</span> Pra sempre.
          </>
        }
      />
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <TiltCard max={5} className="offer-border rounded-[2.2rem] p-[1.5px]">
            <div className="relative grid overflow-hidden rounded-[2.1rem] bg-black md:grid-cols-2">
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="relative border-b border-white/10 p-8 sm:p-10 md:border-b-0 md:border-r">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-10 w-10" />
                  <div>
                    <div className="font-display text-lg font-semibold">Site Aureon</div>
                    <div className="text-xs text-zinc-500">Completo · Profissional</div>
                  </div>
                </div>
                <div className="mt-10 text-sm text-zinc-500">
                  Agências cobram <span className="line-through">R$ 3.000 a R$ 10.000</span> + mensalidade
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-400">Com a Aureon</div>
                <div className="mt-1 font-display text-5xl font-bold leading-none chrome-text sm:text-6xl">
                  menos de
                  <br />
                  R$ 1.000
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                  <IconCheck className="h-4 w-4" /> pagamento único · R$ 0/mês
                </div>
                <a href={waLink("Olá, Aureon! Quero garantir meu site por menos de R$ 1.000, sem mensalidade.")} target="_blank" rel="noreferrer" className="btn-chrome mt-10 flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-black">
                  <IconWhats /> Garantir meu site
                </a>
                <p className="mt-3 text-center text-xs text-zinc-500">Orçamento grátis e sem compromisso</p>
              </div>
              <div className="relative p-8 sm:p-10">
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">O que você recebe</div>
                <ul className="mt-6 space-y-4">
                  {list.map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      <span className="text-zinc-200">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TiltCard>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
const faqs = [
  ["Por que não tem mensalidade?", "Usamos tecnologia moderna que permite hospedar sites de alta performance sem custo mensal. Você paga apenas pela criação, uma única vez, e o site continua no ar."],
  ["Quanto custa exatamente?", "Todo projeto sai por menos de R$ 1.000, com valor fechado antes de começar. O preço final depende do tipo de site — chame no WhatsApp e receba seu orçamento grátis."],
  ["E o domínio (www.suaempresa.com.br)?", "O domínio próprio é opcional. Se quiser, ele é registrado no seu nome diretamente no Registro.br, que cobra uma taxa anual baixa (cerca de R$ 40/ano). Nós ajudamos em todo o processo."],
  ["O site vai funcionar no celular?", "Sim! Todos os sites são 100% responsivos e ficam perfeitos em celulares, tablets e computadores."],
  ["Posso pedir alterações?", "Claro. Durante a criação você acompanha o andamento e pode solicitar ajustes até ficar do jeito que você imaginou."],
  ["Vocês atendem fora da Bahia?", "Sim, atendemos clientes de todo o Brasil. Todo o processo é feito online, pelo WhatsApp."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <Heading
        tag="Dúvidas"
        title={
          <>
            Perguntas <span className="chrome-text">frequentes</span>
          </>
        }
      />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <Reveal key={q} delay={i * 50}>
              <div className={`glass overflow-hidden rounded-2xl transition-colors ${isOpen ? "border-white/25" : ""}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-display text-lg font-medium">{q}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl transition-transform duration-300 ${isOpen ? "rotate-45 bg-white text-black" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-zinc-400">{a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
