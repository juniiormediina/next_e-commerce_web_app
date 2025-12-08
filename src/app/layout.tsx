import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next E-Commerce Web App",
  description: "E-commerce creado con Next.js y Tailwind CSS"
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
    <body className="min-h-screen bg-background text-foreground">
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <span className="text-lg font-semibold tracking-tight">
                Next <span className="text-primary">E‑Commerce</span>
              </span>
          <span className="text-xs text-slate-400">
                Demo base
              </span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-slate-500">
          · Next.js + Tailwind · E‑commerce base ·
        </div>
      </footer>
    </div>
    </body>
    </html>
  );
}
