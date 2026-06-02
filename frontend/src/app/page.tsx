import type { Metadata } from "next";
import Link from "next/link";
import {
  Plane, Building2, Globe, Shield, Star, CheckCircle,
  ArrowRight, Wifi, Coffee, ShowerHead, Users, Clock, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export const metadata: Metadata = {
  title: "VeloxLounge — Premium Airport Lounge Access Worldwide",
  description:
    "Access 1,300+ premium airport lounges in 148 countries with a single membership. Enjoy exclusive dining, spa, Wi-Fi, and more with VeloxLounge powered by DragonPass.",
  keywords: [
    "airport lounge access", "DragonPass", "VeloxLounge", "premium travel",
    "lounge membership", "airport lounge", "travel benefits", "priority pass",
  ],
  openGraph: {
    title: "VeloxLounge — Premium Airport Lounge Access",
    description: "Access 1,300+ premium airport lounges in 148 countries.",
    type: "website",
    url: "https://veloxlounge.com",
  },
  twitter: { card: "summary_large_image", title: "VeloxLounge" },
};

// ─── Data ────────────────────────────────────────────────────
const STATS = [
  { value: "1,300+", label: "Premium Lounges" },
  { value: "148",    label: "Countries" },
  { value: "600+",   label: "Airports" },
  { value: "50M+",   label: "Members Served" },
];

const FEATURES = [
  { icon: Building2, title: "1,300+ Lounges",        desc: "Access the world's largest network of premium airport lounges across every major airline hub." },
  { icon: Globe,     title: "148 Countries",          desc: "Whether you're flying through Dubai, London, New York, or Singapore — we've got you covered." },
  { icon: Shield,    title: "Secure & Verified",      desc: "Industry-grade security with bcrypt-encrypted credentials and JWT session management." },
  { icon: Zap,       title: "Instant Activation",     desc: "Link your DragonPass membership ID in seconds and start booking lounges immediately." },
  { icon: Users,     title: "Guest Access",           desc: "Bring family or colleagues. Premium tiers include up to 3 guest passes per visit." },
  { icon: Clock,     title: "Real-time Availability", desc: "Check lounge capacity, hours, and amenities in real time before you book." },
];

const AMENITIES = [
  { icon: Wifi,        label: "High-Speed Wi-Fi" },
  { icon: Coffee,      label: "Premium Dining" },
  { icon: ShowerHead,  label: "Shower Suites" },
  { icon: Globe,       label: "Business Centre" },
  { icon: Star,        label: "Spa & Wellness" },
  { icon: Users,       title: "Guest Lounges" , label: "Guest Lounges" },
];

const LOUNGES = [
  {
    name: "Plaza Premium Lounge",
    airport: "JFK — Terminal 4",
    country: "🇺🇸 United States",
    tier: "Premium",
    // Modern premium airport lounge seating area
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Aspire Lounge",
    airport: "LHR — Terminal 5",
    country: "🇬🇧 United Kingdom",
    tier: "Plus",
    // Comfortable business lounge interior
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Marhaba Lounge",
    airport: "DXB — Terminal 3",
    country: "🇦🇪 UAE",
    tier: "Elite",
    // Opulent elite lounge with dramatic lighting
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "KrisFlyer Gold Lounge",
    airport: "SIN — Terminal 3",
    country: "🇸🇬 Singapore",
    tier: "Premium",
    // Sleek modern premium lounge interior
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "No1 Lounge",
    airport: "LGW — South Terminal",
    country: "🇬🇧 United Kingdom",
    tier: "Standard",
    // Clean, well-lit standard lounge seating
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Be Relax Spa Lounge",
    airport: "CDG — Terminal 2E",
    country: "🇫🇷 France",
    tier: "Plus",
    // Spa and wellness lounge interior
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80&auto=format&fit=crop",
  },
];

const TIERS = [
  {
    name: "Standard",
    price: "Free",
    desc: "Get started with core lounge access.",
    features: ["2 lounge visits/year", "1 guest per visit", "Basic amenities access", "Mobile e-pass"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$99/yr",
    desc: "The most popular choice for frequent travelers.",
    features: ["30 lounge visits/year", "2 guests per visit", "Spa & shower access", "Priority booking", "Dining credits"],
    cta: "Start Premium",
    highlight: true,
  },
  {
    name: "Elite",
    price: "$199/yr",
    desc: "Unlimited access for the true road warrior.",
    features: ["Unlimited visits", "3 guests per visit", "All amenities", "Personal concierge", "No blackout dates"],
    cta: "Go Elite",
    highlight: false,
  },
];

const FAQS = [
  { q: "What is VeloxLounge?", a: "VeloxLounge is a management platform that links to your DragonPass membership, giving you a clean dashboard to manage lounge bookings, e-passes, and visit history." },
  { q: "Do I need an existing DragonPass membership?", a: "Yes. VeloxLounge links to your DragonPass Member ID to verify and sync your membership details. You'll need an active DragonPass account." },
  { q: "How do I activate my membership?", a: "Sign up, log in, go to the Membership page, and enter your DragonPass Member ID. Activation is instant once verified." },
  { q: "Can I bring guests to the lounge?", a: "Yes, depending on your tier. Standard allows 1 guest, Premium 2 guests, and Elite up to 3 guests per visit." },
  { q: "Is my data secure?", a: "Absolutely. Passwords are bcrypt-hashed, sessions use signed JWT tokens, and all API traffic is encrypted over HTTPS." },
];

// ─── Component ───────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <MarketingNav />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-brand-50/30 to-slate-100 dark:from-gray-950 dark:via-brand-950/20 dark:to-gray-900 overflow-hidden"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-brand-300/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium">
                  <Plane className="h-3.5 w-3.5" />
                  Powered by DragonPass
                </div>

                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                  Your Gateway to{" "}
                  <span className="text-brand-500">Premium Lounges</span>{" "}
                  Worldwide
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                  Access 1,300+ airport lounges across 148 countries. Manage your membership, book visits, and travel in absolute comfort — all from one dashboard.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white px-8 gap-2 h-12 text-base">
                      Get Started Free <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="px-8 h-12 text-base border-2">
                      Sign In
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No commitments · Free to get started · Works with your existing DragonPass account
                </p>

                {/* Mini stats */}
                <div className="flex flex-wrap gap-6 pt-2">
                  {STATS.map(({ value, label }) => (
                    <div key={label}>
                      <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero visual */}
              <div className="relative hidden lg:flex justify-center items-center">
                <div className="relative w-full max-w-md">
                  {/* Mock dashboard card */}
                  <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-border p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">DragonPass Member</p>
                        <p className="font-bold text-lg">Alex Johnson</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">PREMIUM</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[["5", "Visits Used"], ["30", "Visit Limit"], ["2", "Guests"]].map(([v, l]) => (
                        <div key={l} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                          <p className="text-2xl font-bold text-brand-500">{v}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{l}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Marhaba Lounge, DXB", date: "Nov 15", status: "Completed" },
                        { name: "Aspire Lounge, LHR", date: "Dec 3", status: "Confirmed" },
                      ].map(({ name, date, status }) => (
                        <div key={name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
                          <div>
                            <p className="font-medium text-xs">{name}</p>
                            <p className="text-xs text-gray-400">{date}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status === "Completed" ? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-brand-500 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> 1,300+ Lounges
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ─────────────────────────────────────── */}
        <section className="bg-brand-500 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center text-white">
                  <p className="text-4xl font-extrabold">{value}</p>
                  <p className="text-brand-100 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────── */}
        <section id="features" className="py-24 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Why VeloxLounge</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Everything you need for premium travel</h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                One platform to manage your DragonPass membership, browse lounges, book visits, and track your travel history.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative p-7 rounded-2xl border border-border bg-gray-50 dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40 mb-5 group-hover:bg-brand-500 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Simple Process</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Up and running in 3 steps</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
              {/* connector line */}
              <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-brand-200 dark:bg-brand-800" />
              {[
                { step: "01", title: "Create Your Account", desc: "Sign up for VeloxLounge in under 60 seconds — just your name, email and a password." },
                { step: "02", title: "Link Your DragonPass ID", desc: "Enter your DragonPass Member ID. We instantly sync your tier, validity, and visit allowance." },
                { step: "03", title: "Book & Enjoy", desc: "Browse 1,300+ lounges, book your visit, get a digital e-pass, and walk in like a VIP." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="relative text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white text-2xl font-extrabold shadow-lg shadow-brand-200 dark:shadow-brand-900/40">
                      {step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Amenities ─────────────────────────────────────── */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider">World-Class Amenities</p>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  More than just a place to wait
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Our partner lounges offer premium experiences that transform your layover into a moment of luxury. From gourmet dining to spa treatments — every detail is curated for the discerning traveler.
                </p>
                <ul className="space-y-3">
                  {["Complimentary food & beverages", "High-speed Wi-Fi & charging stations", "Private shower suites", "Spa, massage & wellness", "Dedicated business workspaces", "Children's play areas"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="bg-brand-500 hover:bg-brand-600 text-white gap-2 mt-2">
                    Explore Lounges <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {AMENITIES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-border hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/40">
                      <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Lounges ──────────────────────────────── */}
        <section id="lounges" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Featured Lounges</p>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Popular destinations</h2>
              </div>
              <Link href="/signup">
                <Button variant="outline" className="gap-2 shrink-0">View All Lounges <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LOUNGES.map(({ name, airport, country, tier, image }) => {
                const tierColor: Record<string, string> = {
                  Standard: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  Plus:     "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
                  Premium:  "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
                  Elite:    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
                };
                return (
                  <div key={name} className="group rounded-2xl border border-border bg-white dark:bg-gray-950 hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${tierColor[tier]}`}>
                        {tier}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">{name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{airport}</p>
                      <p className="text-sm font-medium">{country}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────── */}
        <section id="pricing" className="py-24 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Membership Tiers</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Choose your travel style</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                Link your DragonPass membership and unlock the tier that matches your travel frequency.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {TIERS.map(({ name, price, desc, features, cta, highlight }) => (
                <div
                  key={name}
                  className={`relative rounded-2xl p-8 border-2 transition-all ${
                    highlight
                      ? "border-brand-500 shadow-xl shadow-brand-100 dark:shadow-brand-900/20 bg-brand-500 text-white"
                      : "border-border bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700"
                  }`}
                >
                  {highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full uppercase">
                      Most Popular
                    </div>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>{name}</h3>
                  <p className={`text-3xl font-extrabold my-3 ${highlight ? "text-white" : "text-brand-500"}`}>{price}</p>
                  <p className={`text-sm mb-6 ${highlight ? "text-brand-100" : "text-gray-500 dark:text-gray-400"}`}>{desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${highlight ? "text-brand-50" : "text-gray-600 dark:text-gray-300"}`}>
                        <CheckCircle className={`h-4 w-4 shrink-0 ${highlight ? "text-white" : "text-brand-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button
                      className={`w-full h-11 font-semibold ${
                        highlight
                          ? "bg-white text-brand-600 hover:bg-brand-50"
                          : "bg-brand-500 hover:bg-brand-600 text-white"
                      }`}
                    >
                      {cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">FAQ</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Common questions</h2>
            </div>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-border bg-white dark:bg-gray-950 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{q}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 bg-brand-500">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Ready to travel in style?
            </h2>
            <p className="text-brand-100 text-xl max-w-2xl mx-auto">
              Join thousands of travelers already using VeloxLounge to access the world's finest airport lounges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-brand-50 px-10 h-12 text-base font-semibold gap-2">
                  Start for Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-brand-600 hover:bg-white/10 px-10 h-12 text-base font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
            <p className="text-brand-200 text-sm">No credit card required · Cancel anytime</p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
