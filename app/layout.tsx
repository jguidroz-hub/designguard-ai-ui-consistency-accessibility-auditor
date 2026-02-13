import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DesignGuard: AI UI Consistency & Accessibility Auditor',
  description: 'Value Proposition: For design system managers & front-end teams, automatically audits UI components against design guidelines & accessibility standards (WCAG). Ensures visual consistency & compliance across projects, saving significant design review time.

Target Customer: Mid-sized to large enterprises with complex design systems, design agencies, teams building white-label products requiring strict brand adherence.

---
Category: Micro-SaaS
Target Market: Mid-sized to large enterprises with complex design systems, design agencies, teams building white-label products requiring strict brand adherence.
Source Hypothesis ID: 635aca8a-1af4-483b-84ee-bb9cbcd53e21
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">DesignGuard: AI UI Consistency & Accessibility Auditor</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
