"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

const freedBonsai: { id: string; date: string; name: string; image: string }[] = [
  // Aggiungi qui i bonsai liberati via git:
  // { id: "FB-001", date: "2026-06-01", name: "Olmo cinese", image: "/liberati/fb-001.jpg" },
];

const texts = {
  it: {
    title: "Bonsai",
    titleGreen: "liberati",
    empty: "Nessun bonsai è ancora stato liberato. Sii il primo a donare!",
    back: "← Torna alla home",
    donate: "Adotta un bonsai",
    id: "ID",
    date: "Data",
  },
  en: {
    title: "Freed",
    titleGreen: "bonsai",
    empty: "No bonsai has been freed yet. Be the first to donate!",
    back: "← Back to home",
    donate: "Adopt a bonsai",
    id: "ID",
    date: "Date",
  },
};

export default function Liberati() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const t = texts[lang];

  useEffect(() => {
    const stored = localStorage.getItem("fb-lang");
    if (stored === "en") setLang("en");
  }, []);

  return (
    <>
    <ParticleBackground />
    <div style={{ minHeight: "100vh", background: "transparent", padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>

      <button
        onClick={() => { const next = lang === "it" ? "en" : "it"; setLang(next); localStorage.setItem("fb-lang", next); }}
        style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 100, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.5rem 0.8rem", cursor: "pointer", fontSize: "1.5rem", backdropFilter: "blur(10px)" }}
      >
        {lang === "it" ? "🇺🇸" : "🇮🇹"}
      </button>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, textAlign: "center", marginBottom: "3rem", position: "relative" }}>
        {t.title} <span style={{ color: "#6abf5e" }}>{t.titleGreen}</span>
      </h1>

      {freedBonsai.length === 0 ? (
        <div style={{ textAlign: "center", position: "relative" }}>
          <p style={{ color: "#a0a0a0", fontSize: "1.1rem", marginBottom: "2rem" }}>🌱 {t.empty}</p>
          <Link href="/dona" style={{ display: "inline-block", padding: "1rem 3rem", background: "#4a8c3f", color: "#fff", fontSize: "1rem", fontWeight: 600, borderRadius: "50px", textDecoration: "none" }}>
            {t.donate}
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", maxWidth: "1000px", width: "100%" }}>
          {freedBonsai.map((b) => (
            <div key={b.id} style={{ background: "rgba(74,140,63,0.05)", border: "1px solid rgba(74,140,63,0.15)", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "250px", backgroundImage: `url(${b.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: "1.5rem" }}>
                <p style={{ color: "#6abf5e", fontWeight: 700, fontSize: "0.9rem" }}>{t.id}: {b.id}</p>
                <p style={{ color: "#f0f0f0", fontSize: "1.1rem", margin: "0.5rem 0" }}>{b.name}</p>
                <p style={{ color: "#a0a0a0", fontSize: "0.85rem" }}>{t.date}: {b.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/" style={{ color: "#4a8c3f", textDecoration: "none", fontSize: "0.95rem", marginTop: "3rem", position: "relative" }}>
        {t.back}
      </Link>
    </div>
    </>
  );
}
