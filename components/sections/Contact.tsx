"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import SplitText from "@/components/ui/SplitText";
import GsapReveal from "@/components/ui/GsapReveal";
import Magnetic from "@/components/ui/Magnetic";
import { api } from "@/lib/api/client";
import type { BrandQuoteInput, CreatorApplicationInput } from "@/lib/api/types";

type Mode = "brand" | "creator";

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  full?: boolean;
  textarea?: boolean;
};

const brandFields: Field[] = [
  { name: "name", label: "Your name", type: "text", placeholder: "Jane Doe", required: true },
  { name: "email", label: "Work email", type: "email", placeholder: "jane@company.com", required: true },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 98765 43210" },
  { name: "brand", label: "Brand / company", type: "text", placeholder: "Acme India", required: true },
  { name: "budget", label: "Campaign budget (₹)", type: "text", placeholder: "₹2,00,000 — ₹5,00,000" },
  {
    name: "goals",
    label: "Campaign goals",
    type: "text",
    placeholder: "What do you want to achieve?",
    required: true,
    full: true,
    textarea: true,
  },
];

const creatorFields: Field[] = [
  { name: "name", label: "Creator name", type: "text", placeholder: "Raj Verma", required: true },
  { name: "email", label: "Email address", type: "email", placeholder: "raj@creator.com", required: true },
  { name: "platform", label: "Primary platform", type: "text", placeholder: "YouTube, Instagram…", required: true },
  { name: "followers", label: "Follower count", type: "text", placeholder: "100K", required: true },
  { name: "category", label: "Content category", type: "text", placeholder: "Tech, Lifestyle…" },
  {
    name: "interests",
    label: "What you love creating",
    type: "text",
    placeholder: "Tell us about your content and interests…",
    full: true,
    textarea: true,
  },
];

const tabs: { id: Mode; label: string }[] = [
  { id: "brand", label: "I represent a brand" },
  { id: "creator", label: "I'm a creator" },
];

type Status = { state: "idle" | "loading" | "success" | "error"; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: Field, value: string): string {
  if (field.required && !value.trim()) return `${field.label} is required`;
  if (field.name === "email" && value.trim() && !EMAIL_RE.test(value.trim())) return "Enter a valid email address";
  if (field.name === "followers" && value.trim() && Number.isNaN(Number(value.replace(/[^\d]/g, ""))))
    return "Follower count must be a number";
  return "";
}

export default function Contact() {
  const [mode, setMode] = useState<Mode>("brand");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submittingRef = useRef(false);
  const reduce = useReducedMotion();
  const fields = mode === "brand" ? brandFields : creatorFields;

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    const field = fields.find((f) => f.name === name);
    if (!field) return;
    setErrors((prev) => {
      const next = { ...prev };
      const err = validateField(field, value);
      if (err) next[name] = err;
      else delete next[name];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return; // duplicate-submit guard

    const form = e.currentTarget;
    const data = new FormData(form);

    // Validate every field on submit; focus the first error.
    const nextErrors: Record<string, string> = {};
    let firstInvalid: HTMLInputElement | HTMLTextAreaElement | null = null;
    for (const field of fields) {
      const value = String(data.get(field.name) ?? "");
      const err = validateField(field, value);
      if (err) nextErrors[field.name] = err;
      if (err && !firstInvalid) {
        firstInvalid = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${field.name}"]`);
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      firstInvalid?.focus();
      return;
    }
    setErrors({});

    submittingRef.current = true;
    setStatus({ state: "loading" });
    try {
      const raw = Object.fromEntries(data.entries());
      if (mode === "brand") {
        await api.submitBrandQuote({
          name: String(raw.name),
          email: String(raw.email),
          phone: raw.phone ? String(raw.phone) : undefined,
          brand: String(raw.brand),
          goals: String(raw.goals),
          budget: raw.budget ? String(raw.budget) : undefined,
        } satisfies BrandQuoteInput);
      } else {
        const followersNum = Number(String(raw.followers).replace(/[^\d]/g, ""));
        await api.submitCreatorApplication({
          name: String(raw.name),
          email: String(raw.email),
          platform: String(raw.platform),
          followers: followersNum,
          category: raw.category ? String(raw.category) : undefined,
          interests: raw.interests ? String(raw.interests) : undefined,
        } satisfies CreatorApplicationInput);
      }
      setStatus({
        state: "success",
        message:
          mode === "brand"
            ? "Thank you! We'll contact you within 24 hours to discuss your campaign strategy."
            : "Thank you! We'll review your profile and contact you within 5 business days.",
      });
      form.reset();
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <section id="contact" className="relative overflow-x-clip border-t border-line-2/70 bg-ink-2/40 py-section">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left column — the ask + what happens next */}
          <div className="flex flex-col gap-10 lg:gap-12">
          <GsapReveal y={24} threshold={0.1}>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-blue-bright">
                Let's work together
              </p>
              <SplitText
                as="h2"
                text="What are you looking for?"
                className="text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
              />
              <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-mist sm:text-base">
                Tell us who you are and we'll route you to the right desk. A strategy reply for
                brands within 24 hours, a review for creators within 5 business days.
              </p>
            </div>
          </GsapReveal>

          <GsapReveal as="ol" y={26} stagger={0.12} threshold={0.05} className="space-y-5">
            <li data-gsap-item className="flex items-start gap-4 text-sm text-white/85">
              <span aria-hidden className="num-lock mt-0.5 font-medium text-blue-bright">01</span>
              <span>
                <span className="block font-medium text-white">Brief acknowledgment</span>
                <span className="mt-1 block text-mist">You get a confirmation the moment your request lands.</span>
              </span>
            </li>
            <li data-gsap-item className="flex items-start gap-4 text-sm text-white/85">
              <span aria-hidden className="num-lock mt-0.5 font-medium text-blue-bright">02</span>
              <span>
                <span className="block font-medium text-white">Strategy reply — 24h (brands)</span>
                <span className="mt-1 block text-mist">A tailored campaign direction and creator shortlist.</span>
              </span>
            </li>
            <li data-gsap-item className="flex items-start gap-4 text-sm text-white/85">
              <span aria-hidden className="num-lock mt-0.5 font-medium text-blue-bright">03</span>
              <span>
                <span className="block font-medium text-white">Profile review — 5 days (creators)</span>
                <span className="mt-1 block text-mist">Verification and a match back into the network.</span>
              </span>
            </li>
          </GsapReveal>
          </div>

          {/* Right — choice + form */}
          <GsapReveal y={28} x={24} duration={0.9} threshold={0.08}>
          <div className="rounded-2xl border border-line-2 bg-ink p-6 sm:p-8">
            {/* Tab switcher */}
            <div
              role="tablist"
              aria-label="Choose your path"
              className="mb-8 grid grid-cols-2 gap-2 rounded-full border border-line-2 bg-ink-2 p-1.5"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={mode === tab.id}
                  onClick={() => {
                    setMode(tab.id);
                    setStatus({ state: "idle" });
                    setErrors({});
                  }}
                  className={cn(
                    "rounded-full px-2.5 py-2 text-[13px] font-medium transition-all duration-300 sm:px-3 sm:py-2.5 sm:text-sm",
                    mode === tab.id ? "bg-blue text-white" : "text-mist hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {status.state === "success" ? (
                  <div className="py-14 text-center">
                    <p className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue text-2xl text-white">
                      ✓
                    </p>
                    <h3 className="mt-6 text-xl font-medium text-white">Request received</h3>
                    <p className="mx-auto mt-3 max-w-[38ch] text-sm leading-relaxed text-mist">
                      {status.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus({ state: "idle" })}
                      className="mt-8 text-sm font-medium text-blue-bright hover:text-blue-soft"
                    >
                      Send another response
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {fields.map((field) => {
                        const invalid = Boolean(errors[field.name]);
                        return (
                          <div key={field.name} className={cn(field.full && "sm:col-span-2")}>
                            <label
                              htmlFor={`${mode}-${field.name}`}
                              className="mb-2 block text-sm font-medium text-white"
                            >
                              {field.label}
                              {field.required && (
                                <span aria-hidden className="text-blue">
                                  {" "}
                                  *
                                </span>
                              )}
                            </label>
                            {field.textarea ? (
                              <textarea
                                id={`${mode}-${field.name}`}
                                name={field.name}
                                required={field.required}
                                rows={4}
                                placeholder={field.placeholder}
                                onBlur={onBlur}
                                aria-invalid={invalid || undefined}
                                aria-describedby={invalid ? `${mode}-${field.name}-error` : undefined}
                                className={cn(
                                  "w-full resize-none rounded-lg border bg-ink px-4 py-3 text-sm text-white placeholder:text-dust focus:outline-none",
                                  invalid
                                    ? "border-red-400/60 focus:border-red-400"
                                    : "border-line-2 focus:border-blue"
                                )}
                              />
                            ) : (
                              <input
                                id={`${mode}-${field.name}`}
                                name={field.name}
                                type={field.type}
                                required={field.required}
                                placeholder={field.placeholder}
                                onBlur={onBlur}
                                aria-invalid={invalid || undefined}
                                aria-describedby={invalid ? `${mode}-${field.name}-error` : undefined}
                                className={cn(
                                  "w-full rounded-lg border bg-ink px-4 py-3 text-sm text-white placeholder:text-dust focus:outline-none",
                                  invalid
                                    ? "border-red-400/60 focus:border-red-400"
                                    : "border-line-2 focus:border-blue"
                                )}
                              />
                            )}
                            {invalid && (
                              <p
                                id={`${mode}-${field.name}-error`}
                                role="alert"
                                className="mt-1.5 text-xs text-red-300"
                              >
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {status.state === "error" && (
                      <p
                        role="alert"
                        className="mt-5 rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300"
                      >
                        {status.message}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status.state === "loading"}
                      className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-soft hover:shadow-[0_8px_32px_-8px_var(--color-blue-glow)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status.state === "loading" ? (
                        <>
                          <span
                            aria-hidden
                            className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                          />
                          Sending…
                        </>
                      ) : mode === "brand" ? (
                        "Request a Strategy Session"
                      ) : (
                        "Apply to Join"
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}