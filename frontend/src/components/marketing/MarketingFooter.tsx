import Link from "next/link";
import Image from "next/image";
import { Plane, Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features",     href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Lounges",      href: "/#lounges" },
    { label: "Pricing",      href: "/#pricing" },
  ],
  Company: [
    { label: "About Us",    href: "/about" },
    { label: "Contact",     href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  Support: [
    { label: "Dashboard",   href: "/dashboard" },
    { label: "Login",       href: "/login" },
    { label: "Sign Up",     href: "/signup" },
    { label: "FAQ",         href: "/#faq" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VeloxLounge</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Access over 1,300 premium airport lounges worldwide with a single membership. Travel smarter, travel in comfort.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400 shrink-0" />
                <span>support@veloxlounge.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-400 shrink-0" />
                <span>+1 (800) 555-LOUNGE</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-400 shrink-0" />
                <span>Global — 148 countries</span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-brand-500 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-brand-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} VeloxLounge. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
