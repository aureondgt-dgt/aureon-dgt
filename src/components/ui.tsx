import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { logoSvgPath } from "../lib/shape";

export const CONTACT = {
  whats: "5577998025585",
  whatsDisplay: "(77) 99802-5585",
  insta: "aureon.dgt",
  instaUrl: "https://instagram.com/aureon.dgt",
  email: "aureon.dgt@gmail.com",
};

export const waLink = (msg = "Olá, Aureon! Quero um site profissional sem mensalidade. 🚀") =>
  `https://wa.me/${CONTACT.whats}?text=${encodeURIComponent(msg)}`;

const LOGO_D = logoSvgPath();

export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="chromeG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#bdbdc2" />
          <stop offset="0.55" stopColor="#f4f4f5" />
          <stop offset="0.8" stopColor="#7a7a80" />
          <stop offset="1" stopColor="#d4d4d8" />
        </linearGradient>
      </defs>
      <path d={LOGO_D} fill="url(#chromeG)" fillRule="evenodd" />
    </svg>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] ${
        show ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export function TiltCard({
  children,
  className = "",
  max = 12,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--go", "1");
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--go", "0");
  };
  return (
    <div style={{ perspective: 1000, ...style }} className="h-full">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt relative h-full ${className}`}>
        {children}
        <div className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" />
      </div>
    </div>
  );
}

export function useCountUp(target: number, duration = 700) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min((t - start) / duration, 1);
      const e = 1 - Math.pow(1 - k, 3);
      const v = a + (target - a) * e;
      setVal(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-300 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
      {children}
    </span>
  );
}

/* --- Icons --- */
type IP = { className?: string };
export const IconWhats = ({ className = "w-5 h-5" }: IP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.33 11.33 0 0 0 5.43 1.38h.01c6.25 0 11.34-5.09 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
);
export const IconInsta = ({ className = "w-5 h-5" }: IP) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
export const IconMail = ({ className = "w-5 h-5" }: IP) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const IconArrow = ({ className = "w-4 h-4" }: IP) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
export const IconCheck = ({ className = "w-4 h-4" }: IP) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);
export const IconX = ({ className = "w-4 h-4" }: IP) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
