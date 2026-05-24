"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const texts = {
  it: {
    subtitle: "Un movimento di liberazione",
    heroText: "I bonsai rappresentano un simbolo di controllo sulla natura attraverso maltrattamenti e costrizioni. Insieme possiamo cambiare questa realtà.",
    quote: "Amare significa prendersi cura, senza dominare o possedere completamente.",
    quoteAuthor: "Il Piccolo Principe — Antoine de Saint-Exupéry",
    missionTitle: "The",
    missionGreen: "Mission",
    mission1: "Il bonsai, nonostante venga attentamente accudito, annaffiato e fertilizzato, è costantemente sottoposto a interventi invasivi che ne limitano la crescita naturale.",
    mission2: 'Le pratiche come la potatura radicale delle radici, la legatura e la costante modellatura dell\'albero impongono delle costrizioni fisiche, simili a una',
    mission2bold: '"gabbia dorata"',
    mission3: "Il desiderio di controllare la natura può portare a una relazione distorta con essa, in cui la cura si trasforma in una forma di prigionia.",
    storiaTitle: "Come è",
    storiaGreen: "iniziata",
    storia1: "Avvicinandomi al mondo dei bonsai, inizialmente attratto dalla loro apparente bellezza e raffinata eleganza, ho cominciato a studiare le tecniche di preparazione e cura con entusiasmo.",
    storia2bold: "violenza mascherata",
    storia2: "Ma, lentamente, una consapevolezza inquietante ha preso forma dentro di me: quella che viene celebrata come arte non è altro che una manifestazione di",
    storia2end: "e un puro atto di egoismo.",
    storia3: 'Si tratta di piegare la natura al proprio volere, come farebbe un tiranno con il suo prigioniero, mantenendolo in vita il più a lungo possibile solo per vantarsi davanti agli altri sovrani di come lo abbia "accudito".',
    storia4: "Ogni legatura, ogni potatura non è altro che un simbolo di prevaricazione, un tentativo di piegare l'essenza di ciò che è selvaggio e libero, riducendolo ad un'ombra del suo vero potenziale.",
    supportTitle: "Supporta la",
    supportGreen: "libertà",
    support1: "Abbiamo deciso di intraprendere una missione per ridare libertà a queste meravigliose creature della natura, piantandole in terra, dove potranno finalmente crescere secondo il loro destino.",
    support2: "Ogni pianta verrà restituita alla sua vita naturale, vi terremo aggiornati con foto e racconti riguardanti la sua crescita, in modo che possiate seguire il suo cammino verso la libertà.",
    support3: "Aiutami a liberare i bonsai, uno per uno, ed a trasformare un atto di possesso in un atto di amore per la vita.",
    supportBtn: "Adotta un bonsai",
    footerText: "Ogni pianta che salverai, sarà un passo verso un mondo in cui la natura non è soggiogata, ma rispettata.",
  },
  en: {
    subtitle: "A liberation movement",
    heroText: "Bonsai represent a symbol of control over nature through mistreatment and constraints. Together we can change this reality.",
    quote: "To love means to care, without dominating or fully possessing.",
    quoteAuthor: "The Little Prince — Antoine de Saint-Exupéry",
    missionTitle: "The",
    missionGreen: "Mission",
    mission1: "Despite being carefully tended, watered and fertilized, a bonsai is constantly subjected to invasive interventions that limit its natural growth.",
    mission2: "Practices such as radical root pruning, wiring and constant shaping impose physical constraints, similar to a",
    mission2bold: '"golden cage"',
    mission3: "The desire to control nature can lead to a distorted relationship with it, where care transforms into a form of imprisonment.",
    storiaTitle: "How it",
    storiaGreen: "started",
    storia1: "Approaching the world of bonsai, initially attracted by their apparent beauty and refined elegance, I began to study the techniques of preparation and care with enthusiasm.",
    storia2bold: "masked violence",
    storia2: "But slowly, a disturbing awareness took shape within me: what is celebrated as art is nothing but a manifestation of",
    storia2end: "and a pure act of selfishness.",
    storia3: 'It is about bending nature to one\'s will, as a tyrant would with his prisoner, keeping him alive as long as possible only to boast to other rulers about how he "cared for" him.',
    storia4: "Every binding, every pruning is nothing but a symbol of domination, an attempt to bend the essence of what is wild and free, reducing it to a shadow of its true potential.",
    supportTitle: "Support",
    supportGreen: "freedom",
    support1: "We have decided to embark on a mission to give freedom back to these wonderful creatures of nature, planting them in the ground, where they can finally grow according to their destiny.",
    support2: "Every plant will be returned to its natural life. We will keep you updated with photos and stories about its growth, so you can follow its journey toward freedom.",
    support3: "Help me free bonsai, one by one, and transform an act of possession into an act of love for life.",
    supportBtn: "Adopt a bonsai",
    footerText: "Every plant you save will be a step toward a world where nature is not subjugated, but respected.",
  },
};

function AnimatedSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".fade-up"),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none reverse" },
      }
    );
  }, []);

  return <section ref={ref} id={id} className={className}>{children}</section>;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = 0, mouseY = 0;
    let scrollY = 0;
    const particles: { x: number; y: number; ox: number; oy: number; vx: number; vy: number; size: number; baseSize: number; alpha: number; pulse: number; speed: number; z: number }[] = [];
    const count = 80;
    const connectionDist = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener("scroll", () => { scrollY = window.scrollY; });

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x, y, ox: x, oy: y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        baseSize: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        z: Math.random(),
      });
    }

    let lastScroll = 0;
    let scrollSpeed = 0;

    const onScroll = () => {
      const newScroll = window.scrollY;
      scrollSpeed = (newScroll - lastScroll) * 0.1;
      lastScroll = newScroll;
    };
    window.addEventListener("scroll", onScroll);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      scrollSpeed *= 0.95;

      for (const p of particles) {
        p.pulse += p.speed;
        const breathe = Math.sin(p.pulse) * 0.3 + 0.7;

        if (Math.abs(scrollSpeed) > 0.1) {
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx += (dx / dist) * scrollSpeed * 0.15 * p.z;
          p.vy += (dy / dist) * scrollSpeed * 0.15 * p.z;
        }

        const dmx = mouseX - p.x;
        const dmy = mouseY - p.y;
        const mdist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mdist < 200) {
          p.vx -= dmx * 0.00005;
          p.vy -= dmy * 0.00005;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, `rgba(106, 191, 94, ${p.alpha * breathe})`);
        glow.addColorStop(0.4, `rgba(74, 140, 63, ${p.alpha * breathe * 0.4})`);
        glow.addColorStop(1, "rgba(74, 140, 63, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * breathe, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 220, 140, ${p.alpha * breathe})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(106, 191, 94, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<"it" | "en">("it");
  const [cookieAccepted, setCookieAccepted] = useState(true);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const t = texts[lang];

  useEffect(() => {
    const accepted = localStorage.getItem("gdpr-accepted");
    if (!accepted) setCookieAccepted(false);
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViewCount(d.count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll(".hero-fade"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.25, ease: "power3.out", delay: 0.3 }
    );

    gsap.to(heroRef.current, {
      scale: 1.05,
      opacity: 0.8,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <ParticleBackground />

      {/* TOP BAR */}
      <div style={{ position: "fixed", top: "1rem", right: "1.5rem", zIndex: 100, display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <a
          href="mailto:infofreedombonsai@gmail.com"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", padding: "0.4rem 0.7rem", color: "#a0a0a0", textDecoration: "none", backdropFilter: "blur(10px)", transition: "all 0.3s", display: "flex", alignItems: "center", gap: "0.4rem", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "60px solid transparent", borderRight: "60px solid transparent", borderTop: "8px solid rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.02em", textAlign: "center" }}>infofreedombonsai<br/>@gmail.com</span>
        </a>
        <button
          onClick={() => setLang(lang === "it" ? "en" : "it")}
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: "1.3rem", backdropFilter: "blur(10px)", transition: "all 0.3s" }}
          title={lang === "it" ? "Switch to English" : "Passa all'italiano"}
        >
          {lang === "it" ? "🇺🇸" : "🇮🇹"}
        </button>
      </div>

      {/* GDPR BANNER */}
      {!cookieAccepted && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "rgba(17,17,17,0.95)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", backdropFilter: "blur(10px)" }}>
          <p style={{ color: "#a0a0a0", fontSize: "0.85rem", maxWidth: "800px", margin: 0 }}>
            {lang === "it"
              ? "Questo sito non utilizza cookie di profilazione. Utilizziamo solo cookie tecnici necessari al funzionamento del sito."
              : "This website does not use profiling cookies. We only use technical cookies necessary for the site to function."}
          </p>
          <button
            onClick={() => { localStorage.setItem("gdpr-accepted", "true"); setCookieAccepted(true); }}
            style={{ background: "#4a8c3f", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem 1.5rem", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap" }}
          >
            {lang === "it" ? "Ho capito" : "Got it"}
          </button>
        </div>
      )}

      {/* HERO */}
      <div ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(26,58,24,0.3) 0%, transparent 70%)" }} />

        <h1 className="hero-fade" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 8vw, 8rem)", fontWeight: 700, textAlign: "center", marginBottom: "0.5rem", opacity: 0, position: "relative" }}>
          <span style={{ color: "#6abf5e" }}>Freedom</span>
          <span style={{ color: "#ffffff" }}>Bonsai</span>
        </h1>

        <p className="hero-fade" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "#a0a0a0", textAlign: "center", marginBottom: "3rem", opacity: 0, position: "relative" }}>
          {t.subtitle}
        </p>

        <div className="hero-fade" style={{ position: "relative", width: "clamp(280px, 40vw, 420px)", height: "clamp(350px, 55vw, 550px)", margin: "0 auto", opacity: 0, borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 80px 30px rgba(74,140,63,0.2), 0 0 150px 50px rgba(74,140,63,0.1)" }}>
          <Image src="/bonsai-hero.png" alt="Bonsai che si libera dalle catene dorate" fill style={{ objectFit: "cover" }} priority />
        </div>

        <p className="hero-fade" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "#a0a0a0", textAlign: "center", maxWidth: "700px", lineHeight: 1.8, marginTop: "2rem", opacity: 0, position: "relative" }}>
          {t.heroText}
        </p>

      </div>

      {/* CITAZIONE */}
      <AnimatedSection id="citazione" className="" >
        <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
          <blockquote className="fade-up" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(0.9rem, 1.8vw, 1.5rem)", fontStyle: "italic", lineHeight: 1.6, color: "#f0f0f0", maxWidth: "1000px", margin: "0 auto" }}>
            <span style={{ color: "#4a8c3f", fontSize: "3rem", fontFamily: "serif", verticalAlign: "middle" }}>&ldquo;</span> {t.quote} <span style={{ color: "#4a8c3f", fontSize: "3rem", fontFamily: "serif", verticalAlign: "middle" }}>&rdquo;</span>
          </blockquote>
          <p className="fade-up" style={{ marginTop: "0.3rem", color: "#a0a0a0", fontSize: "1rem" }}>
            {t.quoteAuthor}
          </p>
        </div>
      </AnimatedSection>

      {/* THE MISSION */}
      <AnimatedSection id="mission">
        <div style={{ padding: "2rem 2rem 5rem", textAlign: "center", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, marginBottom: "3rem" }}>
            {t.missionTitle} <span style={{ color: "#6abf5e" }}>{t.missionGreen}</span>
          </h2>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.8, marginBottom: "2rem" }}>
            {t.mission1}
          </p>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.8, marginBottom: "2rem" }}>
            {t.mission2} <span style={{ color: "#ffffff", fontWeight: 600 }}>{t.mission2bold}</span>.
          </p>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.8 }}>
            {t.mission3}
          </p>
        </div>
      </AnimatedSection>

      {/* COME È INIZIATA */}
      <AnimatedSection id="storia">
        <div style={{ padding: "2rem 2rem 5rem", textAlign: "center", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, marginBottom: "3rem" }}>
            {t.storiaTitle} <span style={{ color: "#6abf5e" }}>{t.storiaGreen}</span>
          </h2>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            {t.storia1}
          </p>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            {t.storia2} <span style={{ color: "#ffffff", fontWeight: 600 }}>{t.storia2bold}</span> {t.storia2end}
          </p>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            {t.storia3}
          </p>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t.storia4}
          </p>
        </div>
      </AnimatedSection>

      {/* FOTO TORTURA */}
      <AnimatedSection id="foto-tortura">
        <div style={{ padding: "1rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <div className="fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ position: "relative", width: "200px", height: "280px", borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 40px 10px rgba(140,63,63,0.15)", flexShrink: 0 }}>
              <Image src="/legatura.webp" alt="Bonsai legato con fascette" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "relative", width: "350px", height: "220px", borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 40px 10px rgba(140,63,63,0.15)" }}>
              <Image src="/filo.jpg" alt="Filo di rame avvolto sui rami" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "relative", width: "200px", height: "280px", borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 40px 10px rgba(140,63,63,0.15)", flexShrink: 0 }}>
              <Image src="/schermata.png" alt="Bonsai in mostra con costrizioni" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SUPPORTACI */}
      <AnimatedSection id="supporta">
        <div style={{ padding: "5rem 2rem", textAlign: "center", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, marginBottom: "2rem" }}>
            {t.supportTitle} <span style={{ color: "#6abf5e" }}>{t.supportGreen}</span>
          </h2>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem", fontStyle: "italic" }}>
            {t.footerText}
          </p>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            {t.support1}
          </p>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            {t.support2}
          </p>
          <p className="fade-up" style={{ color: "#ffffff", fontSize: "1.2rem", lineHeight: 1.8, marginBottom: "3rem", fontWeight: 600 }}>
            {t.support3}
          </p>
          <a className="fade-up" href="/dona" style={{ display: "inline-block", padding: "1rem 3rem", background: "#4a8c3f", color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, borderRadius: "50px", textDecoration: "none", transition: "all 0.3s" }}>
            {t.supportBtn}
          </a>
        </div>
      </AnimatedSection>

      {/* FOOTER */}
      <footer style={{ padding: "3rem 2rem", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", marginBottom: "1rem", cursor: "pointer", transition: "opacity 0.3s" }}
        >
          <span style={{ color: "#6abf5e" }}>Freedom</span>Bonsai
        </div>
        {viewCount !== null && (
          <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "0.5rem" }}>
            🌿 {lang === "it" ? `${viewCount} visitatori hanno scoperto FreedomBonsai` : `${viewCount} visitors have discovered FreedomBonsai`}
          </p>
        )}
      </footer>
    </>
  );
}
