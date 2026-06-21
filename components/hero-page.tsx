"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  Books,
  CheckCircle,
  EnvelopeSimple,
  HourglassMedium,
  Scales,
  ShieldCheck,
  UploadSimple,
  WarningCircle
} from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/animate-ui/radix/accordion";

const bookFeatures = [
  {
    title: "Socratic Simulator",
    label: "Claim stress test",
    text: "Turn a thesis into precise questions that expose assumptions, evidence gaps, and stronger objections.",
    icon: Brain
  },
  {
    title: "Logic Fallacy Detector",
    label: "Draft review",
    text: "Highlight risky reasoning without rewriting the student's voice or flattening the argument.",
    icon: WarningCircle
  },
  {
    title: "BYOD Source Desk",
    label: "Source work",
    text: "Upload PDFs, EPUBs, and notes, then practice only against the material the student brought.",
    icon: UploadSimple
  },
  {
    title: "Rubric Scoring Engine",
    label: "Final review",
    text: "Compare a finished essay against contest-style criteria before submission practice.",
    icon: Scales
  },
  {
    title: "Compliance Guard",
    label: "Ethics",
    text: "Block current competition prompts and keep practice focused on approved archives.",
    icon: ShieldCheck
  },
  {
    title: "Academic Calibrator",
    label: "Standards",
    text: "Point students back to thesis structure, transitions, citation habits, and counterargument rules.",
    icon: Books
  }
];

const designSignals = [
  {
    title: "Guides instead of completing",
    text: "The product nudges students toward their own next sentence instead of handing over a finished answer.",
    icon: Brain
  },
  {
    title: "Source-bound practice",
    text: "Every suggestion is framed around student-provided evidence, rubric language, or approved archives.",
    icon: UploadSimple
  },
  {
    title: "Visible integrity",
    text: "Boundary states, paste checks, and rubric traces are first-class UI signals rather than legal footnotes.",
    icon: ShieldCheck
  }
];

const workflowSteps = [
  {
    label: "01",
    title: "Pressure-test the claim",
    text: "Ask for the counterargument, missing definition, and weakest evidence before drafting."
  },
  {
    label: "02",
    title: "Attach sources",
    text: "Bring the archive, packet, notes, or rubric into the same thinking surface."
  },
  {
    label: "03",
    title: "Revise by principle",
    text: "Review logic, structure, transitions, and citations without rewriting the student's voice."
  },
  {
    label: "04",
    title: "Check the boundary",
    text: "Confirm contest rules, current prompts, and originality signals before final practice."
  }
];

const faqItems = [
  {
    question: "Will Thoughtful write essays for students?",
    answer:
      "No. The product is designed around questions, checks, source review, and rubric pressure. It helps students understand their own argument instead of producing a finished submission for them."
  },
  {
    question: "Can students bring their own source packets?",
    answer:
      "Yes. The planned workspace centers on student-provided PDFs, EPUBs, notes, archives, and rubrics so practice stays tied to approved material."
  },
  {
    question: "How does the competition boundary work?",
    answer:
      "Thoughtful is framed for practice and revision discipline. Current competition prompts and prohibited workflows are treated as boundary states, not as writing tasks."
  },
  {
    question: "What is the first pilot focused on?",
    answer:
      "The first pilot validates demand for claim stress tests, source-bound review, rubric checks, and visible integrity signals before building the full writing workspace."
  }
];

const referencePatterns = [
  "Socratic AI tutoring",
  "Scaffolded writing cycles",
  "Focused writing surface",
  "Interactive practice loops"
];

const flipDurationMs = 1500;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeInOutSine = (value: number) => 0.5 - Math.cos(value * Math.PI) / 2;

export function HeroPage() {
  const [activePage, setActivePage] = useState(0);
  const [flipTick, setFlipTick] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [email, setEmail] = useState("");
  const [waitlistState, setWaitlistState] = useState<"idle" | "error" | "success">("idle");
  const [waitlistMessage, setWaitlistMessage] = useState("Private beta opens after the viability check.");
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);
  const activeFeature = bookFeatures[activePage];
  const nextFeature = bookFeatures[(activePage + 1) % bookFeatures.length];

  const revealNextFeature = useCallback(() => {
    setActivePage((current) => (current === bookFeatures.length - 1 ? 0 : current + 1));
  }, []);

  const completeFlip = useCallback(() => {
    setIsFlipping(false);
  }, []);

  const flipForward = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipTick((current) => current + 1);
  };

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!emailPattern.test(normalizedEmail)) {
      setWaitlistState("error");
      setWaitlistMessage("Enter a valid email to join the waitlist.");
      return;
    }

    setIsSubmittingWaitlist(true);
    setWaitlistState("idle");
    setWaitlistMessage("Joining the waitlist...");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: normalizedEmail })
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setWaitlistState("error");
        setWaitlistMessage(result?.error ?? "Could not join the waitlist. Try again in a moment.");
        return;
      }

      setWaitlistState("success");
      setWaitlistMessage("You are on the list. The first pilot note will go to this inbox.");
      setEmail("");
    } catch {
      setWaitlistState("error");
      setWaitlistMessage("Could not reach the waitlist. Check your connection and try again.");
    } finally {
      setIsSubmittingWaitlist(false);
    }
  };

  return (
    <main className="landing-page min-h-[100dvh] overflow-hidden px-4 py-5 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col">
        <nav className="flex min-w-0 items-center justify-between gap-3 border-b border-line/90 pb-5">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md border border-line bg-white/85 text-sage shadow-soft transition group-hover:-translate-y-[1px]">
              <Brain size={20} weight="duotone" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-zinc-950">Thoughtful</span>
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-line bg-white/72 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted shadow-soft sm:inline-flex">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-copper opacity-25" />
                <span className="relative inline-flex size-2 rounded-full bg-copper" />
              </span>
              Design pilot
            </span>
            <a
              href="#waitlist"
              className="hidden items-center justify-center gap-2 rounded-md border border-line bg-white/84 px-4 py-2.5 text-sm font-semibold text-ink shadow-soft transition hover:border-sage hover:text-sage active:scale-[0.98] min-[430px]:inline-flex"
            >
              Waitlist
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </nav>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-line bg-white/78 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted shadow-soft sm:text-xs sm:tracking-[0.16em]">
              <ShieldCheck size={16} weight="duotone" />
              Boundary-first essay practice
            </div>
            <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[0.9] tracking-tight text-zinc-950 sm:text-7xl lg:text-8xl">
              A thinking studio for stronger student essays.
            </h1>
            <p className="mx-auto mt-6 max-w-[62ch] text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Thoughtful helps students test claims, work from their own sources, and understand rubric pressure before a draft goes anywhere near a contest.
            </p>
          </div>

          <CenteredBookStage
            activeFeature={activeFeature}
            nextFeature={nextFeature}
            flipTick={flipTick}
            isFlipping={isFlipping}
            onFlip={flipForward}
            onComplete={completeFlip}
            onReveal={revealNextFeature}
          />

          <WaitlistForm
            email={email}
            waitlistState={waitlistState}
            waitlistMessage={waitlistMessage}
            isSubmitting={isSubmittingWaitlist}
            onEmailChange={(value) => {
              setEmail(value);
              if (waitlistState !== "idle") {
                setWaitlistState("idle");
                setWaitlistMessage("Private beta opens after the viability check.");
              }
            }}
            onSubmit={handleWaitlistSubmit}
          />

          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {referencePatterns.map((pattern) => (
              <div key={pattern} className="rounded-md border border-line bg-white/64 px-4 py-3 text-center text-sm font-semibold text-ink shadow-soft">
                {pattern}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 border-y border-line/85 py-8 md:grid-cols-3">
          {designSignals.map((item) => {
            const ItemIcon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-line bg-white/72 p-5 shadow-soft">
                <span className="grid size-11 place-items-center rounded-md bg-canvas text-sage">
                  <ItemIcon size={22} weight="duotone" />
                </span>
                <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 py-12 md:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">Practice model</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-4xl">
              Designed around the work students actually do.
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              The landing system borrows the strongest current edtech patterns: guided AI, scaffolded writing, visible progress, and integrity signals that are understandable at a glance.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {workflowSteps.map((step) => (
              <article key={step.label} className="rounded-lg border border-line bg-white/72 p-5 shadow-soft">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-copper">{step.label}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-line/85 py-12 md:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-4xl">
              Clear boundaries before the pilot opens.
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Short answers for the questions that matter before students, parents, or coaches join the first waitlist group.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="rounded-lg border border-line bg-white/72 px-5 shadow-soft"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent keepRendered>
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mb-8 grid gap-6 rounded-lg border border-line bg-ink p-6 text-white shadow-strong sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Coming soon</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Validate the pilot before building the full workspace.</h2>
            <p className="mt-3 max-w-[64ch] text-sm leading-6 text-white/72">
              This landing page keeps the promise narrow: explain the product, collect early demand, and signal that the responsible AI boundary is part of the core experience.
            </p>
          </div>
          <a
            href="#waitlist"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-ink transition hover:bg-amber active:scale-[0.98]"
          >
            Join waitlist
            <ArrowRight size={17} weight="bold" />
          </a>
        </section>
      </div>
    </main>
  );
}

function WaitlistForm({
  email,
  waitlistState,
  waitlistMessage,
  isSubmitting,
  onEmailChange,
  onSubmit
}: {
  email: string;
  waitlistState: "idle" | "error" | "success";
  waitlistMessage: string;
  isSubmitting: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <form
        id="waitlist"
        onSubmit={onSubmit}
        className="grid w-full min-w-0 gap-3 rounded-lg border border-line bg-white/82 p-2 text-left shadow-medium backdrop-blur-sm sm:grid-cols-[1fr_auto_auto]"
      >
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <div className="relative min-w-0">
          <EnvelopeSimple
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sage"
            size={20}
            weight="duotone"
          />
          <input
            id="waitlist-email"
            type="email"
            value={email}
            disabled={isSubmitting}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="you@example.com"
            aria-describedby="waitlist-message"
            aria-invalid={waitlistState === "error"}
            className="min-h-12 w-full min-w-0 rounded-md border border-transparent bg-canvas py-3 pl-12 pr-4 text-base font-medium text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sage focus:bg-white focus:ring-4 focus:ring-sage/10"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-sage px-5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:bg-[#415c4f] active:scale-[0.98] sm:w-auto"
        >
          {isSubmitting ? "Joining..." : "Join waitlist"}
          {waitlistState === "success" ? <CheckCircle size={17} weight="bold" /> : <ArrowRight size={17} weight="bold" />}
        </button>
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-line bg-zinc-100 px-5 text-sm font-semibold text-zinc-500 sm:w-auto"
        >
          <HourglassMedium size={17} weight="duotone" />
          Coming soon
        </button>
      </form>
      <p
        id="waitlist-message"
        aria-live="polite"
        className={`mt-3 min-h-6 text-sm ${waitlistState === "error" ? "text-red-700" : "text-muted"}`}
      >
        {waitlistMessage}
      </p>
    </div>
  );
}

function CenteredBookStage({
  activeFeature,
  nextFeature,
  flipTick,
  isFlipping,
  onFlip,
  onComplete,
  onReveal
}: {
  activeFeature: (typeof bookFeatures)[number];
  nextFeature: (typeof bookFeatures)[number];
  flipTick: number;
  isFlipping: boolean;
  onFlip: () => void;
  onComplete: () => void;
  onReveal: () => void;
}) {
  return (
    <div className="mt-10 grid w-full items-center gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,620px)_minmax(0,0.8fr)]">
      <div className="relative mx-auto w-full max-w-[620px] lg:col-start-2 lg:row-start-1">
        <div className="rounded-lg border border-line bg-white/76 p-3 shadow-strong backdrop-blur-md sm:p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">Live practice surface</p>
            <span className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-muted">
              Source-bound
            </span>
          </div>
          <button
            type="button"
            aria-label="Flip book page"
            onClick={onFlip}
            className="hero-book-stage group relative block w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-left outline-none transition duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4"
          >
            <div className="relative rounded-lg border-[4px] border-sage bg-sage p-1.5 shadow-medium">
              <div className="book-spread relative aspect-[1.36] overflow-visible rounded-md border border-line bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                <div className="absolute inset-0 overflow-hidden rounded-md">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <BlankPage side="left" settling={isFlipping} />
                    <BlankPage side="right" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-zinc-300 shadow-[0_0_28px_rgba(24,24,27,0.22)]" />
                  <div className="absolute bottom-4 left-1/2 top-4 w-6 -translate-x-1/2 rounded-full bg-zinc-950/[0.03] blur-md" />
                </div>
                {isFlipping && <BookFlipSheet key={flipTick} onComplete={onComplete} onReveal={onReveal} />}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-10 -bottom-5 h-10 rounded-full bg-sage/10 blur-2xl transition group-hover:bg-sage/16" />
          </button>
        </div>
      </div>

      <div className="lg:col-start-1 lg:row-start-1">
        <FunctionCard feature={activeFeature} align="right" />
      </div>

      <div className="lg:col-start-3 lg:row-start-1">
        <FunctionCard feature={nextFeature} align="left" />
      </div>
    </div>
  );
}

function FunctionCard({
  feature,
  align
}: {
  feature: (typeof bookFeatures)[number];
  align: "left" | "right";
}) {
  const FeatureIcon = feature.icon;

  return (
    <aside
      className={`rounded-lg border border-line bg-white/76 p-5 shadow-soft backdrop-blur-sm ${
        align === "right" ? "lg:text-right" : "lg:text-left"
      }`}
    >
      <div className={`flex items-start gap-3 ${align === "right" ? "lg:flex-row-reverse" : ""}`}>
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-canvas text-sage">
          <FeatureIcon size={22} weight="duotone" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-copper">{feature.label}</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">{feature.title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{feature.text}</p>
          <div className={`mt-4 flex gap-2 ${align === "right" ? "lg:justify-end" : ""}`}>
            {["Assumption", "Evidence", "Boundary"].map((item) => (
              <span key={item} className="rounded-full border border-line bg-canvas px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function BookFlipSheet({ onComplete, onReveal }: { onComplete: () => void; onReveal: () => void }) {
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return undefined;

    let timeoutId = 0;
    let startedAt = 0;
    let revealed = false;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : flipDurationMs;

    const renderFrame = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = clamp((timestamp - startedAt) / duration);
      const eased = easeInOutSine(progress);
      const overshootWindow = clamp((progress - 0.84) / 0.16);
      const overshoot = Math.sin(overshootWindow * Math.PI) * -3.5;
      const sheetRotation = -180 * eased + overshoot;
      const curl = Math.sin(progress * Math.PI);
      const subtleCurve = -3.8 * curl + 1.4 * Math.sin(clamp((progress - 0.68) / 0.32) * Math.PI);
      const lift = 7 * curl;

      sheet.style.transform = `rotateY(${sheetRotation.toFixed(3)}deg) skewY(${subtleCurve.toFixed(3)}deg) translateZ(${lift.toFixed(3)}px)`;
      sheet.style.filter = `brightness(${(1 - Math.sin(progress * Math.PI) * 0.045).toFixed(3)})`;

      if (!revealed && progress >= 0.72) {
        revealed = true;
        onReveal();
      }

      if (progress < 1) {
        timeoutId = window.setTimeout(() => renderFrame(performance.now()), 16);
        return;
      }

      onComplete();
    };

    renderFrame(performance.now());

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onComplete, onReveal]);

  return (
    <div ref={sheetRef} className="book-sheet-flip">
      <div className="book-sheet-face book-sheet-front" />
      <div className="book-sheet-face book-sheet-back" />
    </div>
  );
}

function BlankPage({
  side,
  settling = false
}: {
  side: "left" | "right";
  settling?: boolean;
}) {
  return (
    <div
      className={`relative border-zinc-200 bg-[#fffdf8] ${
        side === "left" ? "border-r shadow-[inset_-18px_0_30px_-26px_rgba(24,24,27,0.62)]" : "shadow-[inset_18px_0_30px_-26px_rgba(24,24,27,0.62)]"
      } ${settling && side === "left" ? "book-page-settle" : ""}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0 21px, rgba(77,109,90,0.18) 22px 23px), linear-gradient(to right, rgba(185,111,62,0.11), transparent 18%)"
      }}
    />
  );
}
