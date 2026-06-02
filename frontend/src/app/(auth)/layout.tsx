import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{
        backgroundImage: "url('/img/bg.webp')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative  z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}