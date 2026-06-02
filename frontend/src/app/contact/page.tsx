"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageCircle, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

const CONTACT_INFO = [
  { icon: Mail,  label: "Email",   value: "support@veloxlounge.com", sub: "We reply within 24 hours" },
  { icon: Phone, label: "Phone",   value: "+1 (800) 555-LOUNGE",     sub: "Mon–Fri, 9AM–6PM IST" },
  { icon: MapPin,label: "Address", value: "Global Platform",          sub: "Serving 148 countries" },
  { icon: Clock, label: "Support Hours", value: "24/7 Online Support", sub: "Email & dashboard chat" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — wire up real email service later
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <MarketingNav />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-brand-50/30 to-slate-100 dark:from-gray-950 dark:via-brand-950/20 dark:to-gray-900 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-400/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium">
              <MessageCircle className="h-3.5 w-3.5" /> Get In Touch
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              We&apos;re here to <span className="text-brand-500">help you</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Have a question about your membership, a lounge booking, or want to learn more about VeloxLounge? Reach out — our team is always ready to help.
            </p>
          </div>
        </section>

        {/* Contact info + Form */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Left — contact details */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Contact Details</p>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Talk to our team</h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    Whether it&apos;s a technical issue, membership query, or partnership enquiry — we want to hear from you.
                  </p>
                </div>

                <div className="space-y-5">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, sub }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40">
                        <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mt-0.5">{value}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick links */}
                <div className="rounded-2xl border border-border bg-gray-50 dark:bg-gray-900 p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Quick Links</h3>
                  <div className="space-y-2.5">
                    {[
                      { label: "Login to Dashboard",    href: "/login" },
                      { label: "Create Account",        href: "/signup" },
                      { label: "Learn About VeloxLounge", href: "/about" },
                    ].map(({ label, href }) => (
                      <Link
                        key={label}
                        href={href}
                        className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-950 border border-border hover:border-brand-300 dark:hover:border-brand-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-all group"
                      >
                        {label}
                        <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-brand-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40">
                      <CheckCircle className="h-10 w-10 text-brand-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2 gap-2"
                      onClick={() => { setSubmitted(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-gray-50 dark:bg-gray-900 p-8 lg:p-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Fill out the form and we&apos;ll respond as soon as possible.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="Alex Johnson"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          rows={6}
                          placeholder="Describe your question or issue in detail..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-base gap-2"
                      >
                        {loading ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                        ) : (
                          <><Mail className="h-4 w-4" /> Send Message</>
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
