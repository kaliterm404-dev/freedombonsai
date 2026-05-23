"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const texts = {
  it: {
    title: "Adotta un",
    titleGreen: "bonsai",
    subtitle: "Ogni donazione contribuisce a liberare un bonsai dalle sue costrizioni e restituirlo alla terra.",
    amount: "Scegli quanto donare",
    custom: "Importo personalizzato",
    donate: "Dona con PayPal",
    back: "← Torna alla home",
    thanks: "Grazie per il tuo contributo. Ogni pianta liberata è un passo verso un mondo più giusto.",
  },
  en: {
    title: "Adopt a",
    titleGreen: "bonsai",
    subtitle: "Every donation helps free a bonsai from its constraints and return it to the earth.",
    amount: "Choose your donation",
    custom: "Custom amount",
    donate: "Donate with PayPal",
    back: "← Back to home",
    thanks: "Thank you for your contribution. Every freed plant is a step toward a more just world.",
  },
};

export default function Dona() {
  const ref = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<"it" | "en">("it");
  const [selected, setSelected] = useState<number | null>(null);
  const t = texts[lang];

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".fade-up"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("fb-lang");
    if (stored === "en") setLang("en");
  }, []);

  const amounts = [5, 10, 25, 50];

  const handleDonate = () => {
    if (!selected) return;
    const paypalUrl = `https://paypal.me/freedombonsai/${selected}EUR`;
    window.open(paypalUrl, "_blank");
  };

  return (
    <div ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", background: "#0a0a0a" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(26,58,24,0.3) 0%, transparent 70%)" }} />

      {/* LANGUAGE TOGGLE */}
      <button
        onClick={() => { const next = lang === "it" ? "en" : "it"; setLang(next); localStorage.setItem("fb-lang", next); }}
        style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 100, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.5rem 0.8rem", cursor: "pointer", fontSize: "1.5rem", backdropFilter: "blur(10px)" }}
      >
        {lang === "it" ? "🇺🇸" : "🇮🇹"}
      </button>

      <h1 className="fade-up" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, textAlign: "center", marginBottom: "1rem", position: "relative" }}>
        {t.title} <span style={{ color: "#6abf5e" }}>{t.titleGreen}</span>
      </h1>

      <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", textAlign: "center", maxWidth: "600px", lineHeight: 1.6, marginBottom: "3rem", position: "relative" }}>
        {t.subtitle}
      </p>

      <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "1rem", position: "relative" }}>
        {t.amount}
      </p>

      <div className="fade-up" style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
        {amounts.map((a) => (
          <button
            key={a}
            onClick={() => setSelected(a)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.3rem",
              fontWeight: 700,
              borderRadius: "12px",
              border: selected === a ? "2px solid #6abf5e" : "2px solid rgba(255,255,255,0.15)",
              background: selected === a ? "rgba(74,140,63,0.2)" : "rgba(255,255,255,0.05)",
              color: selected === a ? "#6abf5e" : "#a0a0a0",
              cursor: "pointer",
              transition: "all 0.3s",
              minWidth: "80px",
            }}
          >
            €{a}
          </button>
        ))}
      </div>

      <button
        className="fade-up"
        onClick={handleDonate}
        disabled={!selected}
        style={{
          padding: "1rem 3rem",
          background: selected ? "#4a8c3f" : "rgba(255,255,255,0.1)",
          color: selected ? "#fff" : "#555",
          fontSize: "1.1rem",
          fontWeight: 600,
          borderRadius: "50px",
          border: "none",
          cursor: selected ? "pointer" : "not-allowed",
          transition: "all 0.3s",
          position: "relative",
          marginBottom: "1.5rem",
        }}
      >
        {t.donate}
      </button>

      <p className="fade-up" style={{ color: "#555", fontSize: "0.85rem", textAlign: "center", maxWidth: "500px", position: "relative", marginBottom: "3rem" }}>
        {t.thanks}
      </p>

      <Link href="/" className="fade-up" style={{ color: "#4a8c3f", textDecoration: "none", fontSize: "0.95rem", position: "relative" }}>
        {t.back}
      </Link>
    </div>
  );
}
