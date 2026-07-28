import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Portfolio | G. Ichko — Full Stack Developer",
  description:
    "Browse all projects by G. Ichko — full-stack web apps, mobile apps, and backend systems built with Spring Boot, Next.js, Flutter, and more.",
  alternates: {
    canonical: `${baseUrl}/portfolio`,
  },
  openGraph: {
    title: "Portfolio | G. Ichko — Full Stack Developer",
    description:
      "Browse all projects by G. Ichko — full-stack web apps, mobile apps, and backend systems.",
    url: `${baseUrl}/portfolio`,
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
