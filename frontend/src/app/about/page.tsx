import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Globe, Shield, Users, Target, Heart, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export const metadata: Metadata = {
  title: "About VeloxLounge — Our Mission & Story",
  description:
    "Learn about VeloxLounge — the platform that connects travelers to 1,300+ premium airport lounges worldwide. Built on DragonPass, designed for modern travelers.",
  openGraph: {
    title: "About VeloxLounge",
    description: "Premium airport lounge access, reimagined for modern travelers.",
  },
};

const VALUES = [
  { icon: Globe,   title: "Global Reach",       desc: "We believe premium travel shouldn't be limited by geography. 148 countries, 600+ airports, one membership." },
  { icon: Shield,  title: "Trust & Security",    desc: "Industry-grade encryption, secure JWT sessions, and transparent data practices — your information is always safe." },
  { icon: Users,   title: "Traveler First",      desc: "Every design decision is made with the traveler in mind. Clean UI, instant activation, no hidden friction." },
  { icon: Heart,   title: "Quality Obsessed",    desc: "We partner only with DragonPass-certified lounges that meet our strict standards for comfort, service, and amenities." },
  { icon: Target,  title: "Purpose Built",       desc: "VeloxLounge isn't a generic app — it's purpose-built for lounge management, with every feature serving that mission." },
  { icon: Plane,   title: "Always Improving",    desc: "We iterate continuously based on traveler feedback. New features, better UX, and real DragonPass API integration coming soon." },
];

const TEAM = [
  { name: "Anshuman Raj",   role: "Founder & CEO",        initials: "AR", bg: "bg-brand-500" },
  { name: "Product Team",   role: "Design & Engineering",  initials: "PT", bg: "bg-violet-500" },
  { name: "Travel Partners",role: "DragonPass Integration", initials: "TP", bg: "bg-amber-500" },
];

export default function AboutPage() {
  return (
    <>
      <MarketingNav />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-brand-50/30 to-slate-100 dark:from-gray-950 dark:via-brand-950/20 dark:to-gray-900 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-400/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium">
              <Plane className="h-3.5 w-3.5" /> Our Story
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Redefining Premium <span className="text-brand-500">Airport Travel</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              VeloxLounge was built with a single belief: every traveler deserves a moment of calm before a flight. We make accessing the world's best lounges effortless.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Our Mission</p>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Making premium travel accessible to everyone
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Airport lounges used to be exclusive to first-class passengers and airline status holders. We believe that comfort, productivity, and relaxation before a flight should be available to every traveler — not just the privileged few.
                </p>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  By partnering with DragonPass — the world's largest lounge access network — VeloxLounge gives you a clean, modern platform to manage your membership, browse available lounges, and book your visit in seconds.
                </p>
                <ul className="space-y-3">
                  {["Transparent membership management", "Real-time lounge availability", "Digital e-passes — no physical card needed", "Complete visit history and activity logs"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: "1,300+", label: "Partner Lounges",    bg: "bg-brand-500 text-white" },
                  { value: "148",    label: "Countries",           bg: "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-300" },
                  { value: "600+",   label: "Airports Covered",    bg: "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-300" },
                  { value: "50M+",   label: "Lounge Visits/Year",  bg: "bg-brand-500 text-white" },
                ].map(({ value, label, bg }) => (
                  <div key={label} className={`rounded-2xl p-8 text-center ${bg}`}>
                    <p className="text-4xl font-extrabold">{value}</p>
                    <p className={`text-sm mt-2 ${bg.includes("brand-500") ? "text-brand-100" : "text-gray-500 dark:text-gray-400"}`}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">What We Stand For</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our core values</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group p-7 rounded-2xl border border-border bg-white dark:bg-gray-950 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40 mb-5 group-hover:bg-brand-500 transition-colors">
                    <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">The Team</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Built by travelers, for travelers</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                VeloxLounge is built by a team passionate about making travel better — with deep expertise in fintech, travel technology, and user experience.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {TEAM.map(({ name, role, initials, bg }) => (
                <div key={name} className="text-center p-8 rounded-2xl border border-border bg-gray-50 dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full ${bg} text-white text-2xl font-bold mx-auto mb-5 shadow-lg`}>
                    {initials}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-500">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-4xl font-extrabold text-white">Join us on the journey</h2>
            <p className="text-brand-100 text-lg">
              Experience premium airport lounges like never before — with the simplest lounge management platform available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-brand-50 px-8 h-12 font-semibold gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-brand-600 hover:bg-white/10 px-8 h-12 font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
