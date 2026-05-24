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
    customPlaceholder: "Altro importo (€)",
    donate: "Dona con PayPal",
    back: "← Torna alla home",
    fund: "Fondo attuale",
    nextBonsai: "Prossimo bonsai: €15",
    confirmTitle: "Hai completato la donazione?",
    confirmYes: "Sì, ho donato",
    confirmNo: "No, ci ho ripensato",
    confirmThanks: "Grazie! La tua donazione è stata registrata.",
    privacy: "Per rispettare la tua privacy, non tracciamo i pagamenti. L'importo che vedi è basato sulle donazioni autodichiarate dai nostri sostenitori.",
    seeFreed: "Guarda i bonsai liberati →",
  },
  en: {
    title: "Adopt a",
    titleGreen: "bonsai",
    subtitle: "Every donation helps free a bonsai from its constraints and return it to the earth.",
    amount: "Choose your donation",
    customPlaceholder: "Other amount (€)",
    donate: "Donate with PayPal",
    back: "← Back to home",
    fund: "Current fund",
    nextBonsai: "Next bonsai: €15",
    confirmTitle: "Did you complete the donation?",
    confirmYes: "Yes, I donated",
    confirmNo: "No, I changed my mind",
    confirmThanks: "Thank you! Your donation has been recorded.",
    privacy: "To respect your privacy, we do not track payments. The amount shown is based on self-declared donations from our supporters.",
    seeFreed: "See freed bonsai →",
  },
};

export default function Dona() {
  const ref = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<"it" | "en">("it");
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState<"choose" | "confirm" | "thanks">("choose");
  const [fund, setFund] = useState<number | null>(null);
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
    fetch("/api/fund").then(r => r.json()).then(d => setFund(d.amount)).catch(() => {});
  }, []);

  const amounts = [5, 10, 15, 25];

  const getAmount = (): number => {
    if (customAmount) return parseFloat(customAmount) || 0;
    return selected || 0;
  };

  const handleDonate = () => {
    const amount = getAmount();
    if (!amount || amount <= 0) return;
    const paypalUrl = `https://paypal.me/freedombonsai/${amount}EUR`;
    window.open(paypalUrl, "_blank");
    setStep("confirm");
  };

  const handleConfirm = async () => {
    const amount = getAmount();
    if (!amount) return;
    await fetch("/api/fund", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount }) });
    const res = await fetch("/api/fund");
    const data = await res.json();
    setFund(data.amount);
    setStep("thanks");
  };

  const activeAmount = customAmount ? parseFloat(customAmount) > 0 : selected !== null;

  return (
    <div ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", background: "#0a0a0a" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(26,58,24,0.3) 0%, transparent 70%)" }} />

      <button
        onClick={() => { const next = lang === "it" ? "en" : "it"; setLang(next); localStorage.setItem("fb-lang", next); }}
        style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 100, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.5rem 0.8rem", cursor: "pointer", fontSize: "1.5rem", backdropFilter: "blur(10px)" }}
      >
        {lang === "it" ? "🇺🇸" : "🇮🇹"}
      </button>

      <h1 className="fade-up" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, textAlign: "center", marginBottom: "1rem", position: "relative" }}>
        {t.title} <span style={{ color: "#6abf5e" }}>{t.titleGreen}</span>
      </h1>

      <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "1.1rem", textAlign: "center", maxWidth: "600px", lineHeight: 1.6, marginBottom: "2rem", position: "relative" }}>
        {t.subtitle}
      </p>

      {/* FUND COUNTER */}
      {fund !== null && (
        <div className="fade-up" style={{ display: "flex", gap: "2rem", marginBottom: "2rem", position: "relative" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#6abf5e" }}>€{fund.toFixed(2)}</div>
            <div style={{ fontSize: "0.8rem", color: "#a0a0a0" }}>{t.fund}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.85rem", color: "#555", marginTop: "0.5rem" }}>{t.nextBonsai}</div>
            <div style={{ width: "150px", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", marginTop: "0.5rem", overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, (fund / 15) * 100)}%`, height: "100%", background: "#6abf5e", borderRadius: "3px", transition: "width 0.5s" }} />
            </div>
          </div>
        </div>
      )}

      {step === "choose" && (
        <>
          <p className="fade-up" style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "1rem", position: "relative" }}>
            {t.amount}
          </p>

          <div className="fade-up" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
            {amounts.map((a) => (
              <button
                key={a}
                onClick={() => { setSelected(a); setCustomAmount(""); }}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  borderRadius: "12px",
                  border: selected === a && !customAmount ? "2px solid #6abf5e" : "2px solid rgba(255,255,255,0.15)",
                  background: selected === a && !customAmount ? "rgba(74,140,63,0.2)" : "rgba(255,255,255,0.05)",
                  color: selected === a && !customAmount ? "#6abf5e" : "#a0a0a0",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  minWidth: "80px",
                }}
              >
                €{a}
              </button>
            ))}
          </div>

          <input
            type="number"
            min="1"
            placeholder={t.customPlaceholder}
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setSelected(null); }}
            className="fade-up"
            style={{
              width: "200px",
              padding: "0.8rem 1rem",
              fontSize: "1.1rem",
              textAlign: "center",
              background: "rgba(255,255,255,0.05)",
              border: customAmount ? "2px solid #6abf5e" : "2px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              color: "#fff",
              outline: "none",
              marginBottom: "2rem",
              position: "relative",
            }}
          />

          <button
            className="fade-up"
            onClick={handleDonate}
            disabled={!activeAmount}
            style={{
              padding: "1rem 3rem",
              background: activeAmount ? "#4a8c3f" : "rgba(255,255,255,0.1)",
              color: activeAmount ? "#fff" : "#555",
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: "50px",
              border: "none",
              cursor: activeAmount ? "pointer" : "not-allowed",
              transition: "all 0.3s",
              position: "relative",
              marginBottom: "2rem",
            }}
          >
            {t.donate}
          </button>
        </>
      )}

      {step === "confirm" && (
        <div style={{ textAlign: "center", position: "relative" }}>
          <p style={{ color: "#f0f0f0", fontSize: "1.3rem", marginBottom: "2rem" }}>{t.confirmTitle}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleConfirm} style={{ padding: "1rem 2.5rem", background: "#4a8c3f", color: "#fff", fontSize: "1rem", fontWeight: 600, borderRadius: "50px", border: "none", cursor: "pointer" }}>
              {t.confirmYes}
            </button>
            <button onClick={() => setStep("choose")} style={{ padding: "1rem 2.5rem", background: "rgba(255,255,255,0.1)", color: "#a0a0a0", fontSize: "1rem", fontWeight: 600, borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
              {t.confirmNo}
            </button>
          </div>
        </div>
      )}

      {step === "thanks" && (
        <div style={{ textAlign: "center", position: "relative" }}>
          <p style={{ color: "#6abf5e", fontSize: "1.3rem", marginBottom: "1rem" }}>🌿</p>
          <p style={{ color: "#f0f0f0", fontSize: "1.2rem", marginBottom: "2rem" }}>{t.confirmThanks}</p>
          <button onClick={() => { setStep("choose"); setSelected(null); setCustomAmount(""); }} style={{ padding: "0.8rem 2rem", background: "rgba(255,255,255,0.1)", color: "#a0a0a0", fontSize: "0.9rem", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", marginBottom: "1rem" }}>
            {lang === "it" ? "Fai un'altra donazione" : "Make another donation"}
          </button>
        </div>
      )}

      <p style={{ color: "#444", fontSize: "0.7rem", textAlign: "center", maxWidth: "400px", position: "relative", marginTop: "1rem", marginBottom: "2rem" }}>
        {t.privacy}
      </p>

      <div style={{ display: "flex", gap: "2rem", position: "relative" }}>
        <Link href="/" style={{ color: "#4a8c3f", textDecoration: "none", fontSize: "0.95rem" }}>
          {t.back}
        </Link>
        <Link href="/liberati" style={{ color: "#4a8c3f", textDecoration: "none", fontSize: "0.95rem" }}>
          {t.seeFreed}
        </Link>
      </div>
    </div>
  );
}
